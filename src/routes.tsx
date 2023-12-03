import { createBrowserRouter } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import HomeLayout from "./pages/HomeLayout";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import EntryGrid from "./components/EntryGrid";
import UserGrid from "./components/UserGrid";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./pages/AuthLayout";
import UserProfile from "./components/UserProfile";
import EntryOverview from "./components/EntryOverview";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomeLayout />,
            children: [
              { index: true, element: <EntryGrid /> },
              {
                path: "entries",
                element: <EntryGrid />,
                children: [
                  { index: true, element: <Box /> },
                  { path: ":entryId", element: <EntryOverview /> },
                ],
              },
              {
                path: "users",
                element: <UserGrid />,
                children: [
                  { index: true, element: <Box /> },
                  { path: ":username", element: <UserProfile /> },
                  {
                    path: ":username/entry/:entryId",
                    element: <EntryOverview />,
                  },
                ],
              },
            ],
          },
          // { path: "/:customRoute", element: <ComponentUsesAppLayout /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/logout",
        element: <Box />,
      },
    ],
  },
]);

export default router;
