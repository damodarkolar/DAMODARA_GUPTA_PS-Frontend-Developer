import { AuthReducer } from "./Auth/authReducer";
import { legacy_createStore as createStore ,combineReducers, applyMiddleware, compose} from "redux";

import thunk  from "redux-thunk"
import { CapsuleReducer } from "./Capsule/capsulesReducer";
const rootReducer =combineReducers({
    Auth : AuthReducer,
    Capsule : CapsuleReducer,
})

export const store= createStore(rootReducer,compose(applyMiddleware(thunk)))
// export const store= createStore(rootReducer,compose(applyMiddleware(thunk) ,window.__REDUX_DEVTOOLS_EXTENSION__  && window.__REDUX_DEVTOOLS_EXTENSION__()))
