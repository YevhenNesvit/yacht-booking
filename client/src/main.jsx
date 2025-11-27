import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryClientProvider } from "./reactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "modern-normalize";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryClientProvider>
        <ReactQueryDevtools />
        {/* 2. Обгортаємо App у AuthProvider */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </ReactQueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
