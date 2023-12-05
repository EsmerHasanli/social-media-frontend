import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik } from "formik";
import { TextField, Button, CircularProgress } from "@mui/material";
import { getAllUsers } from "../../../services/api/users";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sign_in } from "../../../redux/slices/usersSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../services/context/UserContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AdminLogin = () => {
  const [users, setUsers] = useState(null);
  const { user, setUser} = useContext(UserContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <section
        style={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(33, 33, 33, 0.47)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(33, 33, 33, 0.24)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "500px",
          }}
        >
          {users === null ? (
            <CircularProgress color="inherit" />
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = "Email is required";
                }

                if (!values.password) {
                  errors.password = "Password is required";
                }

                return errors;
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);

                const adminUser = users.find(
                  (user) =>
                    user.isAdmin &&
                    user.email === values.email &&
                    user.password === values.password
                );

                if (adminUser) {
                  dispatch(sign_in({ email: values.email, password: values.password }));
                  setUser(adminUser);
                  navigate("dashboard");
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Invalid credentials or user does not have access to this page!",
                    showConfirmButton: true,
                  });
                }

                actions.setSubmitting(false);
                actions.resetForm();
              }}
            >
              {(props) => (
                <form
                  style={{
                    padding: "30px 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  onSubmit={props.handleSubmit}
                >
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"
                    error={props.touched.email && Boolean(props.errors.email)}
                    helperText={props.touched.email && props.errors.email}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password"
                    error={props.touched.password && Boolean(props.errors.password)}
                    helperText={props.touched.password && props.errors.password}
                  />
                  <Button type="submit" variant="contained" disabled={props.isSubmitting}>
                    {props.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </form>
              )}
            </Formik>
          )}
        </div>
      </section>
    </ThemeProvider>
  );
};

export default AdminLogin;
