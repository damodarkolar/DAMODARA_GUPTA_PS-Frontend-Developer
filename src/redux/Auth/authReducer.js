import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERR, LOG_OUT } from "./actionTypes";

const initialState={
    loginLoading:false,
    loginErr:false,
    token : ""
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
                token:payload
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
                }
    default:
        return{
            ...store,
        }
}
}