import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { getAllUsers } from "../../../services/api/users";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Button } from "@mui/material";


const SideBar = () => {
    const { user, setUser } = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <>
              <Grid
            style={{
              boxShadow: "none",
              margin: 0,
              padding: 0,
              backgroundColor: "rgb(237,237,237)",
            }}
            item
            xs={false}
            sm={4}
            md={7}
            lg={3}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              style={{ boxShadow: "none", margin: 0, padding: " 50px 0" }}
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>user info and edit</h1>

              <div>
            {user === null ? (
              <>
                <Button color="inherit">
                  <Link style={{ color: "blue" }} to={"/login"}>
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link style={{ color: "blue" }} to={"/register"}>
                    Register
                  </Link>
                </Button>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button color="inherit">
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    to="/user"
                  >
                    <Avatar
                      style={{ height: "50px", width: "50px" }}
                      src={user.profilePicture}
                    />
                    Profile
                  </Link>
                </Button>

                <Button
                  onClick={() => {
                    dispatch(sign_out());
                    Swal.fire({
                      title: "Are you sure to logout?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, log out!",
                    }).then((result) => {
                      setUser(null);
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: "Logged Out!",
                          icon: "success",
                        });
                        navigate("/");
                      }
                    });
                  }}
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
            </Box>
          </Grid>
    </>
  )
}

export default SideBar