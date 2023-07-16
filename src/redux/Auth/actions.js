 import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERR, LOG_OUT, REGISTER_NEW_USER, REGISTER_NEW_USER_LOADING, REGISTER_NEW_USER_ERR, GET_ALL_USERS, SET_LOGIN_ERR_MESSAGE } from "./actionTypes"
 
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

 export const handleGetAllUsers = ( payload ) => {

    return {
        type : GET_ALL_USERS,
        payload
    }
 }

 export const handleSetLoginErrMsg = () =>{
    return {
        type : SET_LOGIN_ERR_MESSAGE,
        payload: "User Not Exist/Please Enter Correct Login Details"
    }
 }


 export const fetchAllUsers = () => ( dispatch ) => {

    fetch(`http://localhost:4004/users`)
    .then(res=>res.json())
    .then(data=>
        dispatch(handleGetAllUsers(data))
    )
    .catch(err=>console.log(err))
}


export const postRegisterNewUser = ( userData ) => ( dispatch ) => {

    fetch(`http://localhost:4004/users/`
            ,{
                method:"POST",
                body:JSON.stringify( userData ),
            headers:{
            "Content-Type": "application/json"
            }
         }
         )
        .then(res=>res.json())
        .then(data=>{
            fetchAllUsers();
        })
        .catch(err=> console.log(err))
}


const loginHandleFunction = () => {

}

export const patchUserLogin = ({useName, password}) => (dispatch) => {

   dispatch(handleLoginLoading());

    fetch(`http://localhost:4004/users?useName=${useName}&password=${password}`)
    .then(res=>res.json())
    .then(data=>
       { 
        if(data.length==0){
            dispatch(handleSetLoginErrMsg())
        }else{
            handleLoginSuccess({token:data.id, logedInUserData:data});
            localStorage.setItem("token", `${data.id}`)
        }
    }
    )
    .catch(err=>dispatch(handleLoginErr()))

}


 