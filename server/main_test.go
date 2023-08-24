package main

import "testing"

func TestGenerateID(t *testing.T) {
	id := GenerateID()

	if want, got := 32, len(id); want != got {
		t.Errorf("want %d, got %d '%s'", want, got, id)
	}
}
