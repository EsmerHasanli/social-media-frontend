import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers, getUserByID, putUser } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../../components/User/SideBar";
import { Avatar, Button, TextField, Typography, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import GridOnIcon from "@mui/icons-material/GridOn";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const defaultTheme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  let [searchedUser, setSearchedUser] = useState({});

  useEffect(() => {
    getUserByID(id).then((response) => {
      setSearchedUser(response);
    });
  }, [id]);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {searchedUser && (
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
                <div style={{ display: "flex", gap: "70px" }}>
                  <Avatar
                    src={searchedUser.profilePicture}
                    style={{ width: "150px", height: "150px" }}
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <article
                      style={{
                        display: "flex",
                        gap: "30px",
                        alignItems: "center",
                      }}
                    >
                      <span>{searchedUser.username}</span>
                      <Button>follow</Button>
                      <Link to="/feed">go back</Link>
                    </article>

                    <article
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <span>0 posts </span>
                      <span>|</span>
                      <span> 0 followers </span>
                      <span>|</span>
                      <span>0 following</span>
                    </article>

                    <article style={{ marginTop: "10px" }}>
                      {searchedUser.fullName}
                    </article>

                    <article style={{ marginTop: "10px" }}>
                      {searchedUser.bio}
                    </article>
                  </div>
                </div>
                {searchedUser.isPublic && (
                  <section style={{ padding: "120px 0" }}>
                    <Typography
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      component="h1"
                      variant="h4"
                    >
                      <GridOnIcon />
                      Posts
                    </Typography>

                    <div>
                      <Grid container spacing={2}>
                        {searchedUser.posts.length > 0 ? (
                          searchedUser.posts.sort((a, b) => Number(b.id) - Number(a.id))
                          .map((post) => (
                            <Grid key={post.id} item lg={3} md={6} xs={12}>
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
                                        {searchedUser.username}
                                      </span>
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
                          ))
                        ) : (
                          <div style={{ margin: "100px auto" }}>
                            <img
                              style={{ width: "510px", height: "335px" }}
                              src="https://uploads.dailydot.com/e52/31/87610fa1a0ae891d.png?auto=compress&fm=png"
                              alt=""
                            />
                          </div>
                        )}
                      </Grid>
                    </div>
                  </section>
                )}

                {!searchedUser.isPublic && (
                  <div style={{ margin: "100px auto" }}>
                    <img
                      style={{ width: "570px", height: "330px" }}
                      src="https://i.pinimg.com/736x/a9/74/dc/a974dc45afb77cc377e3a3b1e6a45ea9.jpg"
                      alt=""
                    />
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default UserProfile;
