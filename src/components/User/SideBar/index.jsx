import React, { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Modal from "@mui/material/Modal";
import { getAllUsers, putUser } from "../../../services/api/users";
import { sign_out } from "../../../redux/slices/usersSlice";
import { useFormik } from "formik";
import editSchema from "../../../validation/editSchema";
import Swal from "sweetalert2";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      bio: user.bio,
      profilePicture: user.profilePicture,
      followers: user.followers,
      followings: user.followings,
      requests: user.requests,
      posts: user.posts,
      stories: user.stories,
      isVerified: user.isVerified,
      isPublic: user.isPublic,
      isAdmin: user.isAdmin,
      id: user.id,
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
      changeConfidence: false
    },
    validationSchema: editSchema,
    onSubmit: (values) => {
      putUser(user.id,{ ...values });
      setUser(values)
      handleClose();
    },
  });

  useEffect(() => {
    async function fetchUsers() {
      const fetch = await getAllUsers();
      setUsers(fetch);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    users.map((obj) => {
      if (obj.email == user.email) {
        const findedUser = obj;
        setUser(findedUser);
      }
    });
  }, [user]);

  useEffect(()=>{
    setUser(user);
  },[setUser])

  return (
    <>
      {user && (
        <Grid
          style={{
            boxShadow: "none",
            margin: 0,
            padding: 0,
            backgroundColor: "rgb(237,237,237)",
          }}
          item
          xs={false}
          sm={4}
          md={7}
          lg={3}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            style={{ boxShadow: "none", margin: 0, padding: " 50px 0" }}
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={user.profilePicture}
              alt=""
              style={{
                height: "250px",
                width: "250px",
                objectFit: "cover",
                objectPosition: "center",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "8px",
              }}
            />
            <Typography
              style={{ marginTop: "10px" }}
              component="h1"
              variant="h5"
            >
              {user.fullName}
            </Typography>

            <Typography
              style={{
                marginTop: "5px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {user.username}
              {user.isPublic ? <LockOpenIcon /> : <LockIcon />}
            </Typography>

            <Typography style={{ marginTop: "10px" }}>
              <i> {user.bio} </i>
            </Typography>

            <ul
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <Link to='/user'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span>{user.followers ? user.followers.length : 0}</span>
                <span>Followers</span>
              </Link>

              <li style={{ fontSize: "40px", fontWeight: "lighter" }}>|</li>

              <Link to='/user'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span>{user.followings ? user.followings.length : 0}</span>
                <span>Following</span>
              </Link>

              <li style={{ fontSize: "40px", fontWeight: "lighter" }}>|</li>

              <Link to="/user"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span>{user.posts ? user.posts.length : 0}</span>
                <span>Posts</span>
              </Link>
            </ul>

            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <Button color="inherit">
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    to="/user"
                  >
                    Profile
                  </Link>
                </Button>

                {location.pathname == "/user" && (
                  <>
                    <Button onClick={handleOpen} component="h1" variant="h5">
                      Edit User Info
                    </Button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <form
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("fullName")}
                            error={
                              formik.touched.fullName &&
                              Boolean(formik.errors.fullName)
                            }
                            helperText={
                              formik.touched.fullName && formik.errors.fullName
                            }
                          />

                          <TextField
                            label="Username "
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("username")}
                            error={
                              formik.touched.username &&
                              Boolean(formik.errors.username)
                            }
                            helperText={
                              formik.touched.username && formik.errors.username
                            }
                          />

                          <TextField
                            label="Bio "
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("bio")}
                            error={
                              formik.touched.bio && Boolean(formik.errors.bio)
                            }
                            helperText={formik.touched.bio && formik.errors.bio}
                          />

                          <TextField
                            label="Current Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("currentPassword")}
                            error={
                              formik.touched.currentPassword &&
                              Boolean(formik.errors.currentPassword)
                            }
                            helperText={
                              formik.touched.currentPassword &&
                              formik.errors.currentPassword
                            }
                          />

                          <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("newPassword")}
                            error={
                              formik.touched.newPassword &&
                              Boolean(formik.errors.newPassword)
                            }
                            helperText={
                              formik.touched.newPassword &&
                              formik.errors.newPassword
                            }
                          />

                          <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps("confirmPassword")}
                            error={
                              formik.touched.confirmPassword &&
                              Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                            }
                          />

                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...formik.getFieldProps("changeConfidence")}
                                  defaultChecked={
                                    formik.values.changeConfidence
                                  }
                                />
                              }
                              label="Change confidence"
                            />
                          </FormGroup>

                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ backgroundColor: "rgb(255,153,154)" }}
                            onClick={formik.handleSubmit}
                          >
                            SAVE CHANGES
                          </Button>
                        </form>
                      </Box>
                    </Modal>
                  </>
                )}

                <Button color="inherit">
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    to="/feed"
                  >
                    Feed
                  </Link>
                </Button>

                <Button
                  style={{ marginTop: "30px" }}
                  onClick={() => {
                    dispatch(sign_out());
                    Swal.fire({
                      title: "Are you sure to logout?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, log out!",
                    }).then((result) => {
                      setUser(null);
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: "Logged Out!",
                          icon: "success",
                        });
                        navigate("/");
                      }
                    });
                  }}
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default SideBar;
