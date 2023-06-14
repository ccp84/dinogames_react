import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./api/axiosDefaults";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { CurrentMessageProvider } from "./contexts/CurrentMessageContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider>
        <CurrentMessageProvider>
          <Container>
            <Header />
            <App />
          </Container>
        </CurrentMessageProvider>
      </CurrentUserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
