import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/notfound";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { ResetPasswordConfirm } from "./pages/auth/resetPasswordConfirm";
import { Layout } from "./components/layout";
import { User } from "./pages/myAccount/user";
import { DynamicContent } from "./pages/dynamicContent";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/reset-password/confirm/:token',
    element: <ResetPasswordConfirm />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/minha-conta',
        element: <User />,
      },
      {
        path: '/:categoryId/:subCategoryId/:formId?',
        element: <DynamicContent />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export { router };
