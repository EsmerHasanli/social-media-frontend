import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers, putUser } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Avatar, TextField, Typography, styled, Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import SideBar from "../../../components/User/SideBar";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const defaultTheme = createTheme();

const Feed = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [searchedUser, setSearchedUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }

    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

  const handleFollow = async (id) => {
    const requestedUser = users.find((x) => x.id === id);

    const request = {
      id: Date.now().toString(),
      userId: user.id,
    };

    if (!requestedUser.isPublic) {
        if (!requestedUser.requests.find((x) => x.id === user.id)) {
          await putUser(requestedUser.id, {
            requests: [...requestedUser.requests, request],
          });
          alert('request send')
        }else{
          alert('you alredy sent request lately')
        }
    } 
    else {
      console.log('test ', requestedUser)
        if (!requestedUser.followings.find((x) => x.id === user.id)) {
          await putUser(user.id, {
            followings: [...user.followings, request],
          });

          await putUser(requestedUser.id, {
            followers: [...user.followers, request],
          });

          alert('added to friends')
        }else{
          alert('already in friends')
        }
    }

  };

  return (
    <>
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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <TextField
                  style={{ width: "35%", position: "relative" }}
                  id="filled-basic"
                  label="search"
                  variant="filled"
                  // onChange={async () => {
                  //   const users = await getAllUsers();
                  //   setSearchedUser(users);
                  // }}
                  //onBlur={() => setSearchedUser([])}
                  onChange={(e) => {
                    setSearchQuery(e.target.value.toLowerCase());

                    const filteredUsers = users.filter((obj) =>
                      obj.username.includes(searchQuery)
                    );

                    setSearchedUser(filteredUsers);
                  }}
                  autoComplete="off"
                />

                <ul
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    position: "absolute",
                    top: "106px",
                    width: "24.5%",
                    height: "200px",
                    overflow: "auto",
                    zIndex: 3,
                  }}
                >
                  {searchQuery &&
                    searchedUser &&
                    searchedUser.map((x) =>
                      x.username !== user.username && x.username !== "admin" ? (
                        <li
                          key={x.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px 10px ",
                            cursor: "pointer",
                            backgroundColor: "white",
                          }}
                          onClick={(e) => {
                            // e.stopPropagation();
                            // console.log(x.id);
                            // x.requests.push({
                            //   userId: x.id,
                            //   id: Date.now().toString(),
                            // });
                            // setSearchedUser([]);
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Avatar src={x.profilePicture} />
                            {x.username}
                          </span>

                          <Button
                            data-id={x.id}
                            onClick={(e) => {
                              handleFollow(e.target.getAttribute("data-id"));
                            }}
                          >
                            follow
                          </Button>
                        </li>
                      ) : null
                    )}
                </ul>
              </div>

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
                  Stories
                </Typography>

                <Swiper
                  //navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <SwiperSlide
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                    }}
                  >
                    {" "}
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src={user.profilePicture}
                    />
                    <div
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                        position: "absolute",
                        top: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "50px",
                        color: "white",
                      }}
                    >
                      +
                    </div>
                  </SwiperSlide>

                  <SwiperSlide
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                    }}
                  >
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

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
                    <Grid item xs={3} lg={3} md={12}>
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
                                style={{ color: "pink", fontWeight: "bolder" }}
                              >
                                13
                              </span>
                              <Favorite />
                            </div>
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={3} lg={3} md={12}>
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
                                style={{ color: "pink", fontWeight: "bolder" }}
                              >
                                13
                              </span>
                              <Favorite />
                            </div>
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={3} lg={3} md={12}>
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
                                style={{ color: "pink", fontWeight: "bolder" }}
                              >
                                13
                              </span>
                              <Favorite />
                            </div>
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={3} lg={3} md={12}>
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
                                style={{ color: "pink", fontWeight: "bolder" }}
                              >
                                13
                              </span>
                              <Favorite style={{ fill: "red" }} />
                            </div>
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={3} lg={3} md={12}>
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
                                style={{ color: "pink", fontWeight: "bolder" }}
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
              </div>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Feed;
