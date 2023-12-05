import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const UserContext = createContext("");

const UserContextProvider = ({children})=>{
    let[user,setUser] = useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null);
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProvider
