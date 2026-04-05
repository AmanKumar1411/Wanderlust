import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";
import { ThemeProvider } from "./components/providers/theme-provider.jsx";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "create-trip",
        element: <CreateTrip />,
      },
      {
        path: "view-trip/:tripId",
        element: <ViewTrip />,
      },
      {
        path: "my-trips",
        element: <MyTrips />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
