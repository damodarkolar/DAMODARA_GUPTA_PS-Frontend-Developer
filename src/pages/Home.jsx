
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCapsulesData, fetchCapsulesDataWithFilters, fetchSingleCapsuleData, handleSetCapsuleSerialNumber } from "../redux/Capsule/actions";
import { v4 as uuid } from 'uuid';
import { CapsuleBoxCapsuleCard } from "../components/CapsulesBoXCapsuleCard/CapsulesBoXCapsuleCard";
import style from "./styles/Home.module.css"
import arrow from "../assests/arrow.png"
import capsuleImg1 from "../assests/caps-1.jpeg"
import capsuleImg2 from "../assests/caps-2.jpeg"
import capsuleImg3 from "../assests/caps-3.jpeg"
import capsuleImg4 from "../assests/caps-4.jpeg"
import capsuleImg5 from "../assests/caps-5.jpeg"
import capsuleImg6 from "../assests/caps-6.jpeg"
import capsuleImg7 from "../assests/caps-7.jpeg"
import capsuleImg8 from "../assests/caps-8.jpeg"
import capsuleImg9 from "../assests/caps-9.jpeg"
import capsuleImg10 from "../assests/caps-10.svg"
import { CapsuleCard } from "../components/CapsuleCard/CapsuleCard";



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
    const [typeFilter, setTypeFilter] = useState("select Typ");
    const [statusFilter, setStatusFilter] = useState("select status");
    const [originalFilter, setOriginalFilter] = useState("");
    const [selectedPageNo, setSelectedPageNo] = useState(1);
    const [bannerImgDisplayIndex, setBannerDisplayIndex] = useState(0) ;
    const [singleCapsuleNumber, setSingleCapsuleNumber] = useState("");
    const [showSingleCapsuleCard, setShowSingleCapsuleCard] = useState(false);
    const [showTypeFilterOptions, setTypeFilterOption] = useState(false);
    const [showStatusFilterOptions, setShowStatusFilterOptions] =useState(false)




    let generatedArr = [];
    let bannerImages = [capsuleImg1, capsuleImg2, capsuleImg3, capsuleImg4, capsuleImg5, capsuleImg6, capsuleImg7, capsuleImg8, capsuleImg9, capsuleImg10]

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

    const handlestatusFilter = (filterOption) =>{
        setStatusFilter(filterOption);
        setShowStatusFilterOptions(false)
    }
    const banerIndexChangeFun = (action) =>{
        if(action=="inc"){
            if(bannerImgDisplayIndex==bannerImages.length-1){
                setBannerDisplayIndex(0)
            }else{
                setBannerDisplayIndex(bannerImgDisplayIndex+1)
            }
        }else{
            if(bannerImgDisplayIndex==0){
                setBannerDisplayIndex(bannerImages.length-1)
            }else{
                setBannerDisplayIndex(bannerImgDisplayIndex-1)

            }
        }
        
    }

    const handleFilterSubmit = () => {
        if(typeFilter=="" && statusFilter==""){
            return
        }
        setStatusFilter("select Status")

        dispatch(fetchCapsulesDataWithFilters(typeFilter, statusFilter))
    }
    

    useEffect(() => {
        dispatch(fetchSingleCapsuleData(singleCapsuleNumber))
    }, [singleCapsuleNumber])

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
                <img src={bannerImages[bannerImgDisplayIndex]} alt="arrow"/>
                <div className={style.arrowContainer}>
                    <div className={style.arrowBox} onClick={()=> banerIndexChangeFun("dec")} >
                    <img src={arrow} alt="arrow"/>

                    </div>
                    <div className={style.arrowBox} onClick={() => banerIndexChangeFun("inc")}>
                    <img src={arrow} alt="arrow" style={{transform:"rotate(180deg)"}} />

                    </div>
                </div> 
                <div className={style.homeBannerDotsContainer}>
                    {
                        bannerImages.map((ele, i)=>{
                            return <div onClick={()=> setBannerDisplayIndex(i)} className={`${bannerImgDisplayIndex==i ?`${style.bannerDotSelected}`: `${style.bannerDotNotSelected}`}`}>

                            </div>
                        })
                    }
                </div>              
            </div>


            <div className={style.homePageSortingBox}>
                {/* <div className={style.filerInputBox}>
                    <div>{typeFilter}</div>
                    <div className={style.filerDropDown}>
                        <div className={style.filterSingleDropDownOption}></div>
                        <div className={style.filterSingleDropDownOption}></div>

                    </div>
                </div> */}
                <div className={style.filerInputBox} onClick={()=>setShowStatusFilterOptions(!showStatusFilterOptions)}>
                    <div>{statusFilter}</div>
                    <div className={style.filerDropDown}>
                        {showStatusFilterOptions&&<>
                    <div className={style.filterSingleDropDownOption} onClick={()=>handlestatusFilter("active")}>Active</div>
                    <div className={style.filterSingleDropDownOption} onClick={()=>handlestatusFilter("unknown")}>Unknown</div>
                    <div className={style.filterSingleDropDownOption} onClick={()=>handlestatusFilter("retired")}>Retired</div>
                    </>}
                    </div>
                </div>
                <div className={style.filterSubmitButton} onClick={handleFilterSubmit}>
                    Submit
                </div>
            </div>



            {allCapsuleDataLoading? <div>Data is Loading ....</div>:
            <div className={style.homePageCardsContainer}>
                {
                    allCapsuleData.map((capsuleData)=>{
                        return <div className={style.capsuleCard}>
                            <CapsuleBoxCapsuleCard capsuleData={ capsuleData } key={capsuleData.capsule_serial} {...{setSingleCapsuleNumber, setShowSingleCapsuleCard}}/>
                        </div>
                    })
                }
            </div>
            }
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
                 <div className={style.paginationArrowContainer} onClick={()=> handleChangePageNo("inc")}>
                    <img src={arrow} alt="arrow" style={{transform:"rotate(180deg)"}} />
                </div>
            </div>
            {
             showSingleCapsuleCard&&<CapsuleCard {...{setShowSingleCapsuleCard}}/>
        }
        </div>
        
        </>
    )
}
