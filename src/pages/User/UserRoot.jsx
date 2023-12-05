import Navbar from "../../components/User/Navbar"
import { Outlet } from "react-router-dom";

const UserRoot = () => {
  
  return (
    <>
        {/* <Navbar/> */}
        <Outlet/>
    </>
  )
}

export default UserRoot