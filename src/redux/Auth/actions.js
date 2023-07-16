 import {LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERR, LOG_OUT } from "./actionTypes"
 
 export const handleLoginLoading = () =>{

    return {
        type : LOGIN_LOADING
    }
 }

 export const handleLoginSuccess = (payload) =>{

    return {
        type : LOGIN_SUCCESS,
        payload
    }
 }

 export const handleLoginErr = () =>{

    return {
        type : LOGIN_ERR
    }
 }

 export const handleLogOut = () =>{

    return {
        type : LOG_OUT
    }
 }