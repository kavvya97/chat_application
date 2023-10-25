import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client';

const theme = extendTheme({
  colors: {
    brand: {
      50: "#edf9fa",
      100: "#d1ecf1",
      200: "#b6dde3",
      300: "#9bced5",
      400: "#81bfc7",
      500: "#66b0b9",
      600: "#4b919b",
      700: "#30727d",
      800: "#15445f",
      900: "#001641",
    },
  },
});

// Get the root container
const container = document.getElementById('root');

// Create a root for this container
const root = createRoot(container!);

// Render your React tree
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
