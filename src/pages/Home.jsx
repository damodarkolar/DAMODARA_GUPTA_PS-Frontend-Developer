
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCapsulesData, fetchSingleCapsuleData, handleSetCapsuleSerialNumber } from "../redux/Capsule/actions";
import { v4 as uuid } from 'uuid';
import { CapsuleBoxCapsuleCard } from "../components/CapsulesBoXCapsuleCard/CapsulesBoXCapsuleCard";
import style from "./styles/Home.module.css"
import arrow from "../assests/arrow.png"


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
        totalCapsuleCount,
    } = useSelector(state=> state.Capsule);
    const dispatch = useDispatch();

    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [originalFilter, setOriginalFilter] = useState("");
    const [selectedPageNo, setSelectedPageNo] = useState(1)
    let generatedArr = [];

    const arrayGenerator = (numOfElements) => {
        for(let i=0; i<numOfElements; i++){
            generatedArr.push(i+1);
        }
        return generatedArr
    }

    const handleChangePageNo = (action) => {
        if(action=="dec"){
            if(selectedPageNo==1){
                setSelectedPageNo(totalNumberOfPages)
            }else{
                setSelectedPageNo(selectedPageNo-1)

            }
        }else{
            if(selectedPageNo<totalNumberOfPages){
                setSelectedPageNo(selectedPageNo+1)
            }else{
                setSelectedPageNo(1)

            }
        }
    } 


    useEffect(()=>{
        setTotalNumberOfPages(Math.round(totalCapsuleCount/6));

    }, [allCapsuleData])

    useEffect(()=>{

    dispatch(fetchAllCapsulesData({limit:6, offset:((selectedPageNo-1)*6)}));

    },[selectedPageNo])

    return(
        <>
        <div className={style.homeContainer}>
            <div className={style.homePageBanner}>
Banner
            </div>
            <div className={style.homePageSortingBox}>
sorting
            </div>
            <div className={style.homePageCardsContainer}>
                {
                    allCapsuleData.map((capsuleData)=>{
                        return <div className={style.capsuleCard}>
                            <CapsuleBoxCapsuleCard capsuleData={ capsuleData } key={capsuleData.capsule_serial}/>
                        </div>
                    })
                }
            </div>
            <div className={style.homePagePaginationBox}>
                <div className={style.paginationArrowContainer} onClick={()=> handleChangePageNo("dec")}>
                    <img src={arrow} alt="arrow"/>
                </div>
                {
                    arrayGenerator(totalNumberOfPages).map((pageNum, i)=>{
                        return <div onClick={()=> setSelectedPageNo(pageNum)} className={selectedPageNo==(i+1)?`${style.pageNotSelectedDiv}`: `${style.pageSelectedDiv}` }>
                            {pageNum}
                        </div>
                    })
                }
                 <div className={style.paginationArrowContainer}>
                    <img src={arrow} alt="arrow" style={{transform:"rotate(180deg)"}} onClick={()=> handleChangePageNo("inc")}/>
                </div>
            </div>
        </div>
        </>
    )
}