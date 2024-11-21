import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./layout/Main.jsx";
import { RouterProvider } from "react-router-dom";
import render from "./router/Routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./provider/AuthProvider.jsx";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={render}>
      <Main />
    </RouterProvider>
  </QueryClientProvider>
  </AuthProvider>
);
