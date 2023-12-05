import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../services/context/UserContext";
import { sign_out } from "../../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppBar sx={{ background: "black" }} position="static">
      <Container>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Side
          </Typography>
          <Button color="inherit">
            <Link style={{ color: "white" }} to={"users"}>
              Users
            </Link>
          </Button>
          {user && <Button onClick={()=> {  
            dispatch(sign_out())
            setUser(null)
            navigate("/admin")
          }
          } color="inherit">Logout</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
