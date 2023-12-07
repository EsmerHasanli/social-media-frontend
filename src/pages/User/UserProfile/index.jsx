import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers, putUser } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/User/SideBar";
import { Avatar, Button, TextField, Typography, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import GridOnIcon from "@mui/icons-material/GridOn";

const defaultTheme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

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
                <div style={{ display: "flex", gap: "70px" }}>
                  <Avatar style={{ width: "150px", height: "150px" }} />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <article
                      style={{
                        display: "flex",
                        gap: "30px",
                        alignItems: "center",
                      }}
                    >
                      <span>username</span>
                      <Button>follow</Button>
                    </article>

                    <article
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <span> 773 posts </span>
                      <span>|</span>
                      <span> 222 followers </span>
                      <span>|</span>
                      <span>3 337 following</span>
                    </article>

                    <article style={{ marginTop: "10px" }}>
                      user full name
                    </article>

                    <article style={{ marginTop: "10px" }}>user bio</article>
                  </div>
                </div>

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
                                  src="https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  username
                                </span>
                              </Typography>

                              <div style={{ height: "250px" }}></div>

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
                                  src="https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  username
                                </span>
                              </Typography>

                              <div style={{ height: "250px" }}></div>

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
                                  src="https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  username
                                </span>
                              </Typography>

                              <div style={{ height: "250px" }}></div>

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
                                  src="https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  username
                                </span>
                              </Typography>

                              <div style={{ height: "250px" }}></div>

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
                                  src="https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <span
                                  style={{ fontWeight: "700", color: "pink" }}
                                >
                                  username
                                </span>
                              </Typography>

                              <div style={{ height: "250px" }}></div>

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
                    </Grid>
                  </div>
                </section>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default UserProfile;
