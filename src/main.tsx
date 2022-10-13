import React from "react";
import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./useAuth";
// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "/dashboard",
//     element: <Main />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
