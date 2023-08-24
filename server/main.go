package main

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"net/http"
	"sync"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func main() {
	e := echo.New()
	e.Validator = &CustomValidator{validator: validator.New()}
	g := e.Group("/tasks")
	g.Use(middleware.Logger())
	g.Use(middleware.Recover())
	g.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			locker.Lock()
			defer locker.Unlock()

			return next(c)
		}
	})
	g.GET("", func(c echo.Context) error {
		return c.JSON(http.StatusOK, tasks)
	})
	g.POST("", func(c echo.Context) error {
		var task Task
		if err := c.Bind(&task); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		if err := c.Validate(task); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		task.ID = GenerateID()
		tasks = append(tasks, task)

		return c.JSON(http.StatusCreated, task)
	})
	g.PUT("/:id", func(c echo.Context) error {
		id := c.Param("id")
		i := getTaskID(id)
		if i < 0 {
			err := errors.New("task not found")
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		var task Task
		if err := c.Bind(&task); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		if err := c.Validate(task); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}

		tasks[i].Title = task.Title
		tasks[i].Description = task.Description

		return c.NoContent(http.StatusNoContent)
	})
	g.DELETE("/:id", func(c echo.Context) error {
		id := c.Param("id")
		i := getTaskID(id)
		if i < 0 {
			err := errors.New("task not found")
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		tasks = append(tasks[:i], tasks[i+1:]...)

		return c.NoContent(http.StatusNoContent)
	})
	e.Start("127.0.0.1:5555")
}

func getTaskID(id string) int {
	for i, task := range tasks {
		if task.ID == id {
			return i
		}
	}
	return -1
}

func GenerateID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

var locker = new(sync.Mutex)
var tasks = make([]Task, 0)

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required`
}
