import { CAPSULE_ALL_DATA, CAPSULE_ALL_DATA_LOADING, CAPSULE_ALL_DATA_ERR, CAPSULE_SINGLE_DATA, CAPSULE_SINGLE_DATA_LOADING, CAPSULE_SINGLE_DATA_ERR, SET_CAPSULE_SERIAL, SET_CAPSULE_TYPE_FILTER, SET_CAPSULE_STATUS_FILTER, SET_CAPSULE_ORIGINAL_LAUNCH_FILTER, SET_PAGE_NUMBER } from "./actionTypes"


 

const capsuleReducer = {
    allCapsuleDataLoading: false,
    allCapsuleDataErr: false,
    allCapsuleData: [],
    singleCapsuleDataLoading: false,
    singleCapsuleDataErr: false,
    singleCapsuleData: [],
    capsuleSerialNumber: "",
    capsuleTypeFilter: "",  
    capsuleStatusFilter: "",
    capsuleOriginalLaunchFilter: "",
    pageNumber: 1,
}


export const CapsuleReducer = (store=capsuleReducer, {type, payload} )=>{
    switch (type) {
        case CAPSULE_ALL_DATA_LOADING:
            return {
                ...store,
                allCapsuleDataLoading:true,
                allCapsuleDataErr:false,
            }
        case CAPSULE_ALL_DATA_ERR:
            return {
                ...store,
                allCapsuleDataLoading:false,
                allCapsuleDataErr:true,
            }
        case CAPSULE_ALL_DATA:
            return {
                ...store,
                allCapsuleDataLoading:false,
                allCapsuleDataErr:false,
                allCapsuleData: payload,
            }
        case CAPSULE_SINGLE_DATA_LOADING:
            return {
                ...store,
                singleCapsuleDataLoading:true,
                singleCapsuleDataErr:false,
                singleCapsuleData: payload,
            }
        case CAPSULE_SINGLE_DATA_ERR:
            return {
                ...store,
                singleCapsuleDataLoading:false,
                singleCapsuleDataErr:true,
            }
        case CAPSULE_SINGLE_DATA:
            return {
                ...store,
                singleCapsuleDataLoading:false,
                singleCapsuleDataErr:false,
                singleCapsuleData: payload,
            }
        case SET_CAPSULE_SERIAL:
            return{
                ...store,
                capsuleSerialNumber:payload
            }
        case SET_CAPSULE_TYPE_FILTER:
            return {
                ...store,
                capsuleTypeFilter: payload,
            }
        case SET_CAPSULE_ORIGINAL_LAUNCH_FILTER:
            return {
                ...store,
                capsuleOriginalLaunchFilter: payload,
            }
        case SET_CAPSULE_STATUS_FILTER:
            return {
                ...store,
                capsuleStatusFilter: payload,
            }
        case SET_PAGE_NUMBER:
            return {
                ...store,
                pageNumber: payload,
            }
        default:
            return{
                ...store,
            }
    }
    }


