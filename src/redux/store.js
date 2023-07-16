import { AuthReducer } from "./Auth/authReducer";
import { legacy_createStore as createStore ,combineReducers, applyMiddleware, compose} from "redux";
import { CartReducer } from "./Cart/CartReducer";
import thunk  from "redux-thunk"
const rootReducer =combineReducers({
    Auth:AuthReducer,
    Cart: CartReducer
})

export const store= createStore(rootReducer,compose(applyMiddleware(thunk)))