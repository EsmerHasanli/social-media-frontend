import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers, putUser } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, TextField, Typography, styled, Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import SideBar from "../../../components/User/SideBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "./index.module.css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "../../../components/User/Comments";
//import LikePost from "../../../components/User/LikePost";
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
  const [followings, setFollowings] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isPostLiked, setIsPostLiked] = useState(false);

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
    if (searchQuery === "") {
      setSearchedUser([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const followingUsersId = user?.followings?.map(
      (following) => following.userId
    );

    const followingUsers = users.filter((x) => followingUsersId.includes(x.id));

    setFollowings(followingUsers);
  }, [user, users]);

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
        alert("Request sent");
      } else {
        alert("You already sent a request lately");
      }
    } else {
      if (!requestedUser.followings.find((x) => x.id === user.id)) {
        const updatedUser = {
          ...user,
          followings: [
            ...user.followings,
            { userId: requestedUser.id, id: Date.now().toString() },
          ],
        };
        setUser(updatedUser);
        await putUser(user.id, {
          followings: [
            ...user.followings,
            { userId: requestedUser.id, id: Date.now().toString() },
          ],
        });
        await putUser(requestedUser.id, {
          followers: [...requestedUser.followers, request],
        });
        alert("Added to friends");
      } else {
        alert("Already in friends");
      }
    }
  };

  const handleLike = async (postId) => {
    const postAuthor = users.find(
      (user) => user.posts && user.posts.find((p) => p.id === postId)
    );

    //const currentPost = postAuthor.posts.find((post) => post.id === postId);
    let currentPost;

    for (let i = 0; i < postAuthor.posts.length; i++) {
      const post = postAuthor.posts[i];

      if (post.id === postId) {
        currentPost = post;
        break;
      }
    }

    console.log(currentPost);

    const isAlreadyLiked = likedPosts.includes(postId);

    if (!isAlreadyLiked) {

      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      if (currentPost) {
        currentPost.likes.push(user.id);
       }
      const updatedUser = await putUser(postAuthor.id, postAuthor);
    } 
    
    else {

      setLikedPosts((prevLikedPosts) =>
        prevLikedPosts.filter((id) => id !== postId)
      );
      
      postAuthor.posts.likes.remove(user.id);
      const updatedPost = await putUser(postAuthor.id, postAuthor);
    }
  }

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
                    setSearchQuery(e.target.value);
                    const filteredUsers = users.filter(
                      (obj) =>
                        obj.username.includes(e.target.value.toLowerCase()) &&
                        obj.username !== user.username &&
                        obj.username !== "admin"
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
                  {searchedUser &&
                    searchedUser.map((x) => (
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
                      >
                        <Link
                          to={`/users/${x.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Avatar src={x.profilePicture} />
                          {x.username}
                        </Link>

                        <Button
                          data-id={x.id}
                          onClick={(e) => {
                            handleFollow(e.target.getAttribute("data-id"));
                          }}
                        >
                          follow
                        </Button>
                      </li>
                    ))}
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
                //modules={[Navigation]}
                //className="mySwiper"
                >
                  <SwiperSlide className={style.SwiperSlide}>
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

                  <SwiperSlide className={style.SwiperSlide}>
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>

                  <SwiperSlide className={style.SwiperSlide}>
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide className={style.SwiperSlide}>
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide className={style.SwiperSlide}>
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide className={style.SwiperSlide}>
                    <Avatar
                      style={{
                        height: "70px",
                        width: "70px",
                        marginBottom: "10px",
                      }}
                      src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
                    />
                  </SwiperSlide>
                  <SwiperSlide className={style.SwiperSlide}>
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
                    {followings.map(
                      (followedUser) =>
                        followedUser.posts &&
                        followedUser.posts
                          .sort((a, b) => Number(b.id) - Number(a.id))
                          .map((post) => (
                            <Grid key={post.id} item lg={3} md={6} xs={12}>
                              <Item
                                style={{
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundImage: `url('${post.imageLink}')`,
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
                                          src={followedUser.profilePicture}
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
                                          {followedUser.username}
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
                                        {/* <LikePost post={post}/> */}
                                        <article
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontWeight: "bolder",
                                            }}
                                          >
                                            {post.likes.length}
                                          </span>
                                          <IconButton
                                        
                                            onClick={(e) => handleLike(post.id)}
                                          >
                                            <Favorite
                                               style={{
                                                fill: likedPosts.includes(post.id)
                                                  ? "red"
                                                  : "black",
                                              }}
                                            />
                                          </IconButton>
                                        </article>
                                        {/* <article
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontWeight: "bolder",
                                            }}
                                          >
                                            {post.comments.length}
                                          </span>
                                          <ModeCommentIcon
                                            data-id={post.id}
                                            //onClick={handleAddComment}
                                          />
                                        </article> */}
                                        <Comments post={post} postId={post.id}/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Item>
                            </Grid>
                          ))
                    )}
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
