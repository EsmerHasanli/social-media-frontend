import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import UserRoot from "../pages/User/UserRoot";
import AdminRoot from "../pages/Admin/AdminRoot";
import AdminLogin from "../pages/Admin/Login";
import UsersPage from "../pages/Admin/UsersPage";
import Feed from "../pages/User/Feed";
import UserPage from "../pages/User/UserPage";


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
        element: <Feed/>,
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
