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

const Followings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([])

  const getUsers = () => {
    const usersDB = []
    if (followings) {
      followings.map(async item => {
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
   setFollowings(user.followings)
   const followingUsersId = user?.followings?.map(
    (following) => following.userId
  );

  const followingUsers = users.filter((x) => followingUsersId.includes(x.id));
   setFollowedUsers(followingUsers)

  }, [user]);

  const handleUnfollow = async (id) => {
    const updatedFollowings = followings.filter(
      (followingUser) => followingUser.userId !== id
    );
    setFollowings(updatedFollowings);


    const followingsArray = [];

    for (let i = 0; i < updatedFollowings.length; i++) {

      followingsArray.push({
        id: updatedFollowings[i].id,
        userId: updatedFollowings[i].userId,
      });
    }

    setUser((prevUser) => ({
      ...prevUser,
      followings: followingsArray,
    }));

    await putUser(user.id, { followings: followingsArray });
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
                <span>Followings</span>

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
                    followedUsers.map((followingUser) => (
                      <li
                        key={followingUser.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          width: "50%",
                        }}
                      >
                        <Link
                          to={`/users/${followingUser.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            fontSize: "20px",
                          }}
                        >
                          <Avatar
                            style={{ width: "70px", height: "70px" }}
                            src={followingUser.profilePicture}
                          />
                          {followingUser.username}
                        </Link>

                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(237,237,237)",
                            color: "grey",
                          }}
                          data-id={followingUser.id}
                          onClick={(e) =>
                            handleUnfollow(e.target.getAttribute("data-id"))
                          }
                        >
                          unfollow
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
};

export default Followings;