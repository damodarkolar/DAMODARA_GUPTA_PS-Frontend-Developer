
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCapsulesData, fetchSingleCapsuleData, handleSetCapsuleSerialNumber } from "../redux/Capsule/actions";
import { v4 as uuid } from 'uuid';



export const Home = () =>{
    // const []
    const {     
        allCapsuleDataLoading,
        allCapsuleDataErr,
        allCapsuleData,
        singleCapsuleDataLoading,
        singleCapsuleDataErr,
        singleCapsuleData,
        capsuleSerialNumber,
        capsuleTypeFilter,  
        capsuleStatusFilter,
        capsuleOriginalLaunchFilter,
        pageNumber,
    } = useSelector(state=> state.Capsule);
    const dispatch = useDispatch();


    

        useEffect(() => {
            dispatch(fetchAllCapsulesData());
        }, [])

        useEffect(() => {
            console.log(
                allCapsuleData,
                singleCapsuleData,
                capsuleSerialNumber,
                // capsuleTypeFilter,  
                // capsuleStatusFilter,
                // capsuleOriginalLaunchFilter,
                // pageNumber,
                )
        }, [allCapsuleData, singleCapsuleData, capsuleSerialNumber])
        const patchRegisterNewUser = () => {
            fetch(`http://localhost:4004/users/?name=damodar1&password=india1`
        //     ,{
        //         method:"POST",
        //         body:JSON.stringify({
        //         name:"damodar",
        //         email:"indian@gmail.com",
        //         password: "india",
        //         id: uuid()
        //     }),
        //     headers:{
        //     "Content-Type": "application/json"
        //     }
        //  }
         )
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(err=> console.log(err))
        }
    return(
        <>
            <div className="homeContainer">
                Home
                {
                    allCapsuleData.map((capsule)=>{
                        return<button onClick={() =>
                            //  dispatch(fetchSingleCapsuleData(capsule.capsule_serial))
                            patchRegisterNewUser()
                            }>{capsule.capsule_serial}</button>
                    })
                }

            </div>
        </>
    )
}