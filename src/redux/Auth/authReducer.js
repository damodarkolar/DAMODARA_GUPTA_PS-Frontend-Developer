import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERR, LOG_OUT, REGISTER_NEW_USER, REGISTER_NEW_USER_LOADING, REGISTER_NEW_USER_ERR, GET_ALL_USERS, SET_LOGIN_ERR_MESSAGE } from "./actionTypes";

const initialState={
    loginLoading:false,
    loginErr:false,
    token : "",
    allUsers: [],
    logedInUserData: {},
    loginErrMessage: "", 
}

export const AuthReducer = (store=initialState, {type, payload})=>{
switch (type) {
    case LOGIN_LOADING:
        return {
            ...store,
            loginLoading:true,
            loginErr:false,
        }
    case LOGIN_SUCCESS:
            return {
                ...store,
                loginLoading:false,
                loginErr:false,
                token:payload.token,
                logedInUserData: payload.logedInUserData,
                loginErrMessage:"",
            }
    case LOGIN_ERR:
                return {
                    ...store,
                    loginLoading:false,
                    loginErr:true,
                }
    case LOG_OUT:
                return {
                    ...store,
                    token:"",
                    logedInUserData:[],
                    loginErrMessage: "",
                }
    case GET_ALL_USERS:
        return {
            ...store,
            allUsers:payload
        }
     case SET_LOGIN_ERR_MESSAGE:
            return {
                ...store,
                
            }
    default:
        return{
            ...store,
        }
}
}