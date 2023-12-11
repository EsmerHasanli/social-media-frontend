import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Rating,
  TextField,
} from "@mui/material";
import { getAllUsers, putUser } from "../../../services/api/users";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { UserContext } from "../../../services/context/UserContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { current } from "@reduxjs/toolkit";

const Comments = ({ post, postId }) => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddComment = () => {
    handleOpen();
  };

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

  let currentPost;
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

      const postAuthor = users.find(
        (user) => user.posts && user.posts.find((p) => p.id === postId)
      );

      for (let i = 0; i < postAuthor.posts.length; i++) {
        const post = postAuthor.posts[i];
        if (post.id === postId) {
          currentPost = post;
          break;
        }
      }
      console.log(currentPost);

      const newComment = {
        id: Date.now().toString(),
        userId: user.id,
        commment: values,
      };

      const updatedComments = currentPost.comments.push(newComment);

      const updatedUser = await putUser(postAuthor.id, postAuthor);
      console.log(updatedUser);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

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

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <>
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
          {post.comments.length}
        </span>
        <ModeCommentIcon data-id={post.id} onClick={handleAddComment} />
      </article>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} style={closeButtonStyle}>
            <CloseIcon />
          </IconButton>

          <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  onChange={handleChange}
                  value={values.comment}
                  style={{ marginBottom: "10px" }}
                  type="text"
                  id="comment"
                  name="comment"
                  label="Comment"
                  variant="outlined"
                  autoComplete="on"
                />

                <Button
                  style={{ marginBottom: "10px" }}
                  type="submit"
                  variant="contained"
                >
                  Add Comment
                </Button>

                <Button onClick={handleClose} type="button" variant="outlined">
                  Cancel
                </Button>
              </form>
            )}
          </Formik>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              onClick={() => setShowComments(!showComments)}
              style={{ float: "right", width: "40px" }}
            >
              <ExpandMoreIcon />
            </IconButton>

            {showComments && (
              <ul
                style={{
                  marginTop: "10px",
                  height: currentPost?.comments ? '200px' : 'auto',
                  overflowY: currentPost?.comments ? 'scroll' : 'hidden',
                }}
              >
                { currentPost?.comments ? currentPost?.comments.map((c) => (
                  <li
                    key={c.id}
                    style={{ display: "flex", gap: "10px", margin: "10px 0" }}
                  >
                    <Avatar />
                    <span>{c.commment}</span>
                  </li>
                )) : <li>no comments yet</li>}
              </ul>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Comments;
