import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllUsers, postUser } from "../../../services/api/users";
import registerSchema from "../../../validation/registerSchema.js";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
const [users, setUsers] = React.useState([])

  React.useEffect(()=>{
    async function fetchData(){
      let fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers)
    }
    fetchData()
  },[])

  const {
    handleSubmit,
    handleBlur,
    handleChange: formikHandleChange,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      bio: "",
      followers: [],
      followings: [],
      requests: [],
      posts: [],
      stories: [],
      isAdmin: false,
      isVerified: false,
      isPublic: true,
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      try {
        let userExists

        users.map((user)=>{
          if(values.email == user.email || values.username == user.username){
            userExists =user;
          }
        })
  
        if (userExists) {
          actions.setFieldError("email", "Username or email already exists");
          actions.setFieldError("username", "Username or email already exists");

        } else {
          postUser(values);
          actions.resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: registerSchema,
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://media.istockphoto.com/id/1357830750/vector/geometric-illustration-of-multi-coloured-human-figures.jpg?s=2048x2048&w=is&k=20&c=asQO7QSoqPvRGP2xc06s4wtXK7Un0xJTcZVsFQSCmPA=)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Sign up
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
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  autoFocus
                  value={values.fullName}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={values.username}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="profilePicture"
                  label="Profile Picture"
                  name="profilePicture"
                  autoComplete="profilePicture"
                  autoFocus
                  // value={values.profilePicture}
                  onChange={formikHandleChange}
                  onBlur={handleBlur}
                  error={
                    touched.profilePicture && Boolean(errors.profilePicture)
                  }
                  helperText={touched.profilePicture && errors.profilePicture}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                    defaultChecked
                      id="isPublic"
                      name="isPublic"
                      autoComplete="isPublic"
                      autoFocus
                      checked={values.isPublic}
                      onChange={formikHandleChange}
                      onBlur={handleBlur}
                      error={touched.isPublic && Boolean(errors.isPublic)}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                  }
                  label={
                    <Typography variant="body1">Public account</Typography>
                  }
                />

                <br />
                <br />

                <Link to="/" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Register;
