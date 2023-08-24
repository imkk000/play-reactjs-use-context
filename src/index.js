import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as TasksProvider } from './contexts/tasks';

const elm = document.getElementById('root');
const root = ReactDOM.createRoot(elm);

root.render(
  <TasksProvider children={<App />} />
);
