import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sign_in } from "../../../redux/slices/usersSlice";
import { getAllUsers } from "../../../services/api/users";
import Swal from "sweetalert2";
import { UserContext } from "../../../services/context/UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchData();

    if (localStorage.getItem("user")) {
      navigate("feed");
    }
  }, []);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange: formikHandleChange,
  } = useFormik({
    initialValues: {
      id: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        setUser(user);
        dispatch(
          sign_in({
            password: values.password,
            email: values.email,
          })
        );
        navigate("/feed");
      } else {
        Swal.fire({
          title: "Make sure your email and password are correct!",
          text: "If you dont have an account, please Sign Up first!",
          icon: "warning",
        });
      }
      actions.resetForm();
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src="https://cdn.dribbble.com/userupload/7936453/file/original-80071a533bd3c78d18f93bf70c273d1a.mp4"
            type="video/mp4"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ height: "70px", width: "70px", marginBottom: "10px" }}
              src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
            />
            <Typography
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
              component="h1"
              variant="h4"
            >
              Sociala
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={formikHandleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={formikHandleChange}
              />
              <Grid container>
                <Grid item xs>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Button
                disabled={localStorage.getItem("user")}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
