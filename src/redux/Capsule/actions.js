import { CAPSULE_ALL_DATA, CAPSULE_ALL_DATA_LOADING, CAPSULE_ALL_DATA_ERR, CAPSULE_SINGLE_DATA, CAPSULE_SINGLE_DATA_LOADING, CAPSULE_SINGLE_DATA_ERR, SET_CAPSULE_SERIAL, SET_CAPSULE_TYPE_FILTER, SET_CAPSULE_STATUS_FILTER, SET_CAPSULE_ORIGINAL_LAUNCH_FILTER, SET_PAGE_NUMBER, SET_TOTAL_PRODUCT_COUNT } from "./actionTypes"


export const handleGetAllCapsuleDataLoading = () => {
    return {
        type: CAPSULE_ALL_DATA_LOADING,
    }
}

export const handleGetAllCapsuleDataErr = () => {
    return {
        type: CAPSULE_ALL_DATA_ERR,
    }
}

export const handleGetAllCapsuleData = ( payload ) => {
    return {
        type: CAPSULE_ALL_DATA,
        payload,
    }
}
export const handleSetTotalItems = ( payload ) => {
    return {
        type: SET_TOTAL_PRODUCT_COUNT,
        payload,
    }
}
export const handleGetSingleCapsuleDataLoading = () => {
    return {
        type: CAPSULE_SINGLE_DATA_LOADING,
    }
}

export const handleGetSingleCapsuleDataErr = () => {
    return {
        type: CAPSULE_SINGLE_DATA_ERR,
    }
}

export const handleGetSingleCapsuleData = ( payload ) => {
    return {
        type: CAPSULE_SINGLE_DATA,
        payload,
    }
}

export const handleSetCapsuleSerialNumber = ( payload ) => {
    return { 
        type: SET_CAPSULE_SERIAL,
        payload,
    }
}

export const handleSetTypeFilter = ( payload ) => {
    return { 
        type: SET_CAPSULE_TYPE_FILTER,
        payload,
    }
}

export const handleSetStatusFilter = ( payload ) => {
    return { 
        type: SET_CAPSULE_STATUS_FILTER,
        payload,
    }
}

export const handleSetOriginalLaunchFilter = ( payload ) => {
    return { 
        type: SET_CAPSULE_ORIGINAL_LAUNCH_FILTER,
        payload,
    }
}

export const handleSetPageNumber = ( payload ) => {
    return {
        type: SET_PAGE_NUMBER,
        payload,
    }
}

export const fetchAllCapsulesData = ( {limit, offset} ) => ( dispatch, state ) => {

    const { pageNumber } = state().Capsule


    dispatch(handleGetAllCapsuleDataLoading());

    const getCapsuleData = async () =>{
    const response=await fetch(`https://api.spacexdata.com/v3/capsules?limit=${limit}&offset=${offset}`)
    // .then(response=> response.json() )
    // .then(response=>  dispatch(handleGetAllCapsuleData(response)) )
    // .catch(err=>dispatch(handleGetAllCapsuleDataErr()))
    try {
        const data = await response.json()
        dispatch(handleGetAllCapsuleData(data))
        dispatch(handleSetTotalItems(response.headers.get('spacex-api-count')))
    } catch (error) {
        dispatch(handleGetAllCapsuleDataErr())
    }

    }
    getCapsuleData();

}

export const fetchSingleCapsuleData = ( SingleCapsuleSerialNumber ) => ( dispatch, state ) => {

    // const { capsuleSerialNumber } = state().Capsule;

    dispatch(handleGetSingleCapsuleDataLoading())

    fetch(`https://api.spacexdata.com/v3/capsules?capsule_serial=${SingleCapsuleSerialNumber}`)
    .then(res=>res.json())
    .then(data=>
        dispatch(handleGetSingleCapsuleData(data))
        // console.log(data)
        )
    .catch(err=>dispatch(handleGetSingleCapsuleDataErr()))

}

export const fetchCapsulesDataWithFilters = ( {capsuleTypeFilter, capsuleStatusFilter, capsuleOriginalLaunchFilter} ) => ( dispatch, state ) => {
    // const { capsuleTypeFilter, capsuleStatusFilter, capsuleOriginalLaunchFilter } = state().Capsule;
    let filterString="";

    if(capsuleTypeFilter!=""){
        filterString = `type=${capsuleTypeFilter}`
    }
    if(capsuleStatusFilter!=""){
        if(filterString==""){
            filterString = `status=${capsuleStatusFilter}`
        }else{
            filterString = filterString+`&status=${capsuleStatusFilter}`
        }
    }
    if(capsuleOriginalLaunchFilter!=""){
        if(filterString==""){
            filterString = `original_launch=${capsuleOriginalLaunchFilter}`
        }else{
            filterString = filterString+`&original_launch=${capsuleOriginalLaunchFilter}`
        }
    }

    fetch(`https://api.spacexdata.com/v3/capsules?${filterString}`)
    .then(res=>res.json())
    .then(data=>dispatch(handleGetAllCapsuleData(data)))
    .catch(err=>dispatch(handleGetAllCapsuleDataErr()))
}