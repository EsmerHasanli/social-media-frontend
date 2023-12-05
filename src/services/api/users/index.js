import axios from "axios";
import BASE_URL from "../BASE_URL";

//get all users
export const getAllUsers = async()=>{
    let users;
    await axios.get(`${BASE_URL}/users`)
    .then((response)=>{
        users = response.data;
    })
    return users;
}

//get user (id)
export const getUserByID = async(id)=>{
    let user;
    await axios.get(`${BASE_URL}/users/${id}`)
    .then((response)=>{
        user = response.data;
    })
    return user;
}

//post user
export const postUser = async(payload)=>{
    let newUser;
    await axios.post(`${BASE_URL}/users`,payload)
    .then((response)=>{
        newUser = response.data;
    })
    return newUser;
}