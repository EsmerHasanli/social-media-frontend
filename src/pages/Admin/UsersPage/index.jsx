import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../../services/api/users"; 
import {
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { object } from "prop-types";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate("/admin");
    }
    if (user.email !== 'admin@gmail.com') {
      navigate('/feed');
    }
    async function fetchData() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleDeleteUser = async (userId) => {
    try {
      // Call the deleteUser function from your API
      await deleteUser(userId);

      // Update the state to reflect the deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <div style={{ height: "100vh" }}>
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>Users</h1>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {users &&
              users.map((objectUser) => (
                objectUser.username !== "admin" && (
                  <Card key={objectUser.id} sx={{ maxWidth: 345 }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={objectUser.name}
                          src={objectUser.avatar}
                        />
                      }
                      title={objectUser.username}
                      subheader={objectUser.email}
                    />

                    <CardContent>
                      <Button onClick={() => handleDeleteUser(objectUser.id)}>
                        Delete user
                      </Button>
                    </CardContent>
                  </Card>
                )
              ))}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default UsersPage;
