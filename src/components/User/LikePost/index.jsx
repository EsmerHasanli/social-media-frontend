// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../../services/context/UserContext";
// import { getAllUsers, putUser, putPost } from "../../../services/api/users";
// import { Favorite } from "@mui/icons-material";
// import IconButton from "@mui/material/IconButton";


// const LikePost = ({post}) => {
//   const { user, setUser } = useContext(UserContext);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [isPostLiked, setIsPostLiked] = useState(false);

//   const handleLike = async (postId) => {
//     const authorUser = users.find(
//       (user) => user.posts && user.posts.find((p) => p.id === postId)
//     );

//     const postToUpdate = authorUser?.posts.find((p) => p.id === postId);

//     const isAlreadyLiked = likedPosts.includes(postId);

//     if (!isAlreadyLiked) {
//       setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);

//       postToUpdate?.likes.push(user.id);

//       const updatedPost = await putPost(authorUser?.id, {
//         likes: postToUpdate?.likes,
//       });
//     } else {
//       setLikedPosts((prevLikedPosts) =>
//         prevLikedPosts.filter((id) => id !== postId)
//       );

//       postToUpdate.likes = postToUpdate.likes.filter((id) => id !== user.id);

//       const updatedPost = await putPost(authorUser.id, {
//         likes: postToUpdate.likes,
//       });
//     }
//   };

//   // const isPostLiked = (postId) => {
//   //   return likedPosts.includes(postId);
//   // };
//   return (
//     <>
//       <article
//         style={{
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <span
//           style={{
//             fontWeight: "bolder",
//           }}
//         >
//           {post.likes.length}
//         </span>
//         <IconButton
//           style={{
//             fill: isPostLiked ? "red" : "balck",
//           }}
//           data-id={post.id}
//           onClick={(e) => handleLike(e.target.getAttribute("data-id"))}
//         >
//           <Favorite
//             style={{
//               fill: isPostLiked ? "red" : "balck",
//             }}
//             data-id={post.id}
//             // onClick={(e) =>
//             //   handleLike(
//             //     e.target.getAttribute("data-id")
//             //   )
//             // }
//           />
//         </IconButton>
//       </article>
//     </>
//   );
// };

// export default LikePost;
