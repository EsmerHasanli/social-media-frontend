import React, { useContext, useEffect, useState } from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const defaultTheme = createTheme();

const UserPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      imageLink: "",
      messageText: "",
    },
    onSubmit: async (values) => {
      const newPost = {
        id: Date.now().toString(),
        imageLink: values.imageLink,
        messageText: values.messageText,
        likes: [],
        comments: [],
      };

      setUser((prevUser) => ({
        ...prevUser,
        posts: [...prevUser.posts, newPost],
      }));

      await putUser(user.id, { posts: [...user.posts, newPost] });
      console.log(user.posts);

      formik.resetForm();
    },
  });

  const handleIconClick = () => {
    setMenuVisible(!menuVisible);
  };

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
                      {user.posts &&
                        user.posts
                          .sort((a, b) => Number(b.id) - Number(a.id))
                          .map((post, id) => {
                            return (
                              <Grid key={post.id} item xs={3}>
                                <Item
                                  style={{
                                    backgroundImage: `url('${post.imageLink}')`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                  }}
                                >
                                  <div>
                                    <div>
                                      <Typography
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                        component="h1"
                                        variant="h6"
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                          }}
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
                                            style={{
                                              fontWeight: "700",
                                              color: "pink",
                                            }}
                                          >
                                            {user.username}
                                          </span>
                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                          }}
                                        >
                                          <MoreVertIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={handleIconClick}
                                          />

                                          {menuVisible && (
                                            <ul
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                backgroundColor: "white",
                                                width: "80px",
                                                borderRadius: "5px",
                                                position: "absolute",
                                                top: "-14px",
                                                left: "-83px",
                                              }}
                                            >
                                              <li
                                                style={{
                                                  borderBottom:
                                                    "1px solid gray",
                                                }}
                                              >
                                                edit
                                              </li>
                                              <hr />
                                              <li>delete</li>
                                            </ul>
                                          )}
                                        </div>
                                      </Typography>

                                      <div style={{ height: "300px" }}></div>

                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          gap: "10px",
                                          backgroundColor:
                                            "rgba(255, 255, 255, 0.5)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "10px 20px",
                                          }}
                                        >
                                          <span>{post.messageText}</span>
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
                                              {post.comments.length}
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
                                              {post.likes.length}
                                            </span>
                                            <Favorite />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Item>
                              </Grid>
                            );
                          })}
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


