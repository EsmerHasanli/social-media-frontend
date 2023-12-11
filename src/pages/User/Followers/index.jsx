import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../components/User/SideBar";
import { Avatar, Button, Typography, styled } from "@mui/material";
import { getAllUsers, getUserByID, putUser } from "../../../services/api/users";

const Item = styled(Paper)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.text.secondary,
}));

const defaultTheme = createTheme();

const Followers = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([])

  const getUsers = () => {
    const usersDB = []
    if (followers) {
      followers.map(async item => {
        const userFromDb = await getUserByID(item.userId)
        setFollowedUsers([...followedUsers, userFromDb])
      })
    }
  }

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


  useEffect(() => {
    setFollowers(user.followers)
   const followedUsersId = user?.followers?.map(
    (followers) => followers.userId
  );

  const followedUsers = users.filter((x) => followedUsersId.includes(x.id));
   setFollowedUsers(followedUsers)

  }, [user]);

  const handleUnfollow = async (id) => {
    const updatedFollowers = followers.filter(
      (followedUser) => followedUser.userId !== id
    );
    setFollowers(updatedFollowers);

    const followersArray = [];

    for (let i = 0; i < updatedFollowers.length; i++) {

      followersArray.push({
        id: updatedFollowers[i].id,
        userId: updatedFollowers[i].userId,
      });
    }

    setUser((prevUser) => ({
      ...prevUser,
      followers: followersArray,
    }));

    await putUser(user.id, { followers: followersArray });
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
              <Typography
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "50px",
                  justifyContent: "space-between",
                }}
                component="h1"
                variant="h4"
              >
                <span>Followers</span>

                <Button
                  onClick={() => navigate(-1)}
                  style={{ fontSize: "16px", textTransform: "lowercase" }}
                >
                  go back
                </Button>
              </Typography>

              <section>
                <ul>
                  {followedUsers &&
                    followedUsers.map((followedUser) => (
                      <li
                        key={followedUser.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        <Link
                          to={`/users/${followedUser.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            fontSize: "20px",
                          }}
                        >
                          <Avatar
                            style={{ width: "70px", height: "70px" }}
                            src={followedUser.profilePicture}
                          />
                          {followedUser.username}
                        </Link>

                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(237,237,237)",
                            color: "grey",
                          }}
                          data-id={followedUser.id}
                          onClick={(e) =>
                            handleUnfollow(e.target.getAttribute("data-id"))
                          }
                        >
                          remove
                        </Button>
                      </li>
                    ))}
                </ul>
              </section>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Followers