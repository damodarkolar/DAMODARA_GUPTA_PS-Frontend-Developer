
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCapsulesData, fetchSingleCapsuleData, handleSetCapsuleSerialNumber } from "../redux/Capsule/actions";
import { v4 as uuid } from 'uuid';
import { CapsuleBoxCapsuleCard } from "../components/CapsulesBoXCapsuleCard/CapsulesBoXCapsuleCard";
// import style from "./styles/home.module.css"


export const Home = () =>{
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

    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [originalFilter, setOriginalFilter] = useState("")
    let generatedArr = [];

    const arrayGenerator = (numOfElements) => {
        for(let i=0; i<numOfElements; i++){
            generatedArr.push(i+1);
        }
        return generatedArr
    }

    const handlePagination = (pageNum) => { 

        dispatch(fetchAllCapsulesData({limit:"6", offset: ((pageNum-1)*6)}));
    }
    


    useEffect(()=>{
        setTotalNumberOfPages(Math.round(allCapsuleData.length/6));
    }, [allCapsuleData])


    return(
        <>
        <div className="homeContainer">
            <div className={"homePageBanner"}>
Banner
            </div>
            <div className={"homePageSortingBox"}>
sorting
            </div>
            <div className={"homePageCardsContainer"}>
                {
                    allCapsuleData.map((capsuleData)=>{
                        return <div className="capsuleCard">
                            <CapsuleBoxCapsuleCard capsuleData={ capsuleData } key={capsuleData.capsule_serial}/>
                        </div>
                    })
                }
            </div>
            <div className={"homePagePaginationBox"}>
                {
                    arrayGenerator(totalNumberOfPages).map((pageNum)=>{
                        return <div onClick={()=> handlePagination(pageNum)}>
                            {pageNum}
                        </div>
                    })
                }
            </div>
        </div>
        </>
    )
}