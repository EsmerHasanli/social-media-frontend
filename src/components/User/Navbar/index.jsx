import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../services/context/UserContext";
import Swal from "sweetalert2";
import { Avatar, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { sign_out } from "../../../redux/slices/usersSlice";
import style from "./index.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppBar id={style.navbar} position="static">
      <Container>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              style={{ height: "50px", width: "50px" }}
              src="https://cdn.logojoy.com/wp-content/uploads/20220329171603/dating-app-logo-example.jpg"
            />
            <Typography component="h1" variant="h5">
              Sociala
            </Typography>
          </div>
          {user && (
            <div>
              <Button color="inherit">
                <Link style={{ color: "blue" }} to={"/feed"}>
                  Feed
                </Link>
              </Button>
            </div>
          )}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
