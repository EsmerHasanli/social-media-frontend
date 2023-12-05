import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import UserRoot from "../pages/User/UserRoot";
import AdminRoot from "../pages/Admin/AdminRoot";
import AdminLogin from "../pages/Admin/Login";
import UserPage from "../pages/User/UserPage";
import UsersPage from "../pages/Admin/UsersPage";
import FeedPage from "../pages/User/FeedPage";

export const ROUTES = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "feed",
        element: <FeedPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
        {
            index: true,
            element: <AdminLogin/>
        },
        {
          path: 'users',
          element: <UsersPage/>
      }
    ]
  },
];
