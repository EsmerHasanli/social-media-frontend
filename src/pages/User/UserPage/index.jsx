import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers, putUser } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField, Typography, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import SideBar from "../../../components/User/SideBar";
import { useFormik } from "formik";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const defaultTheme = createTheme();

const UserPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    async function findUser() {
      if (user) {
        let currentUser = JSON.parse(localStorage.getItem("user"));
        let allUsers = await getAllUsers();
        setUser(allUsers);
        user.find((obj) => {
          obj.email === currentUser.email;
          setUser(obj);
        });
      }
    }
    findUser();
  }, []);

  useEffect(() => {
    setUser(user);
  }, [setUser]);

  const formik = useFormik({
    initialValues: {
      id: Date.now().toString(),
      imageLink: "",
      messageText: "",
    },
    onSubmit: (values) => {
      // const newPost = user.posts.push(values);
      // putUser(user.id, newPost);
      // console.log(user);
    },
  });

  return (
    <>
      {user && (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <SideBar />
            <Grid
              style={{ boxShadow: "none", display: "flex" }}
              item
              xs={12}
              sm={8}
              md={5}
              lg={9}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                style={{
                  boxShadow: "none",
                  margin: 0,
                  padding: "50px",
                  width: "100%",
                  height: "100%",
                }}
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <form
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "rgb(237,237,237)",
                    borderRadius: "8px",
                    padding: "20px",
                    gap: "20px",
                  }}
                  onSubmit={formik.handleSubmit}
                >
                  <Avatar
                    src={user.profilePicture}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />

                  <div>
                    <TextField
                      style={{ width: "100%", marginBottom: "10px" }}
                      id="imageLink"
                      name="imageLink"
                      label="Image Link"
                      variant="outlined"
                      {...formik.getFieldProps("imageLink")}
                      error={
                        formik.touched.imageLink &&
                        Boolean(formik.errors.imageLink)
                      }
                      helperText={
                        formik.touched.imageLink && formik.errors.imageLink
                      }
                    />

                    <TextField
                      style={{ width: "100%" }}
                      id="messageText"
                      name="messageText"
                      label="Message Text"
                      variant="outlined"
                      {...formik.getFieldProps("messageText")}
                      error={
                        formik.touched.messageText &&
                        Boolean(formik.errors.messageText)
                      }
                      helperText={
                        formik.touched.messageText && formik.errors.messageText
                      }
                    />
                  </div>

                  <button
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "rgb(244,194,194)",
                      color: "white",
                    }}
                    type="submit"
                  >
                    POST
                  </button>
                </form>

                <div style={{ marginTop: "15px" }}>
                  <Typography
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    component="h1"
                    variant="h4"
                  >
                    Posts
                  </Typography>

                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Item
                          style={{
                            backgroundImage:
                              "url(https://images.pexels.com/photos/4819296/pexels-photo-4819296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                                component="h1"
                                variant="h6"
                              >
                                <Avatar
                                  src={user.profilePicture}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  {user.username}
                                </span>
                              </Typography>

                              <div style={{ height: "300px" }}></div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "pink",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  13
                                </span>
                                <Favorite />
                              </div>
                            </div>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item xs={3}>
                        <Item
                          style={{
                            backgroundImage:
                              "url(https://images.pexels.com/photos/4947386/pexels-photo-4947386.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)",
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                                component="h1"
                                variant="h6"
                              >
                                <Avatar
                                  src={user.profilePicture}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  {user.username}
                                </span>
                              </Typography>

                              <div style={{ height: "300px" }}></div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "pink",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  13
                                </span>
                                <Favorite />
                              </div>
                            </div>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item xs={3}>
                        <Item
                          style={{
                            backgroundImage:
                              "url(https://images.pexels.com/photos/7421220/pexels-photo-7421220.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)",
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                                component="h1"
                                variant="h6"
                              >
                                <Avatar
                                  src={user.profilePicture}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  {user.username}
                                </span>
                              </Typography>

                              <div style={{ height: "300px" }}></div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "pink",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  13
                                </span>
                                <Favorite style={{ fill: "red" }} />
                              </div>
                            </div>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item xs={3}>
                        <Item
                          style={{
                            backgroundImage:
                              "url(https://images.pexels.com/photos/5490216/pexels-photo-5490216.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)",
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                                component="h1"
                                variant="h6"
                              >
                                <Avatar
                                  src={user.profilePicture}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  {user.username}
                                </span>
                              </Typography>

                              <div style={{ height: "300px" }}></div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "pink",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  13
                                </span>
                                <Favorite style={{ fill: "red" }} />
                              </div>
                            </div>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item xs={3}>
                        <Item
                          style={{
                            backgroundImage:
                              "url(https://images.pexels.com/photos/4947110/pexels-photo-4947110.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)",
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                                component="h1"
                                variant="h6"
                              >
                                <Avatar
                                  src={user.profilePicture}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  {user.username}
                                </span>
                              </Typography>

                              <div style={{ height: "300px" }}></div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "10px",
                                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 20px",
                                  }}
                                >
                                  <span>this is post text</span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 20px",
                                    gap: "10px",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "pink",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      13
                                    </span>
                                    <ModeCommentIcon />
                                  </span>

                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "pink",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      13
                                    </span>
                                    <Favorite />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default UserPage;
