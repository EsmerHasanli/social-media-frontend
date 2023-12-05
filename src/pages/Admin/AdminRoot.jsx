import { Outlet } from "react-router-dom"
import AdminNavbar from "../../components/Admin/Navbar"

const AdminRoot = () => {
  return (
    <>
        <AdminNavbar/>
        <Outlet/>
    </>
  )
}

export default AdminRoot