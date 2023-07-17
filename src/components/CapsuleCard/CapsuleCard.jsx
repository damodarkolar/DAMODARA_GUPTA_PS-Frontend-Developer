
import { useSelector } from 'react-redux'
import style from "./CapsuleCard.module.css"
import arrow from "../../assests/arrow.png"

export const CapsuleCard = ({setShowSingleCapsuleCard}) => {

        const {     
            singleCapsuleDataLoading,
            singleCapsuleDataErr,
            singleCapsuleData,
        } = useSelector(state=> state.Capsule);

        console.log("singleCapsuleData",singleCapsuleData)
    return (
        <>
        {singleCapsuleDataLoading ? <div className={"capsuleCardLoader"}>CapsuleData Loading ...</div>:
            <div className={style.capsuleCardContainer}>
                <div className={style.capsuleCardInnerContainer}>
                    <div className={style.capsuleCardTitle} onClick={()=> setShowSingleCapsuleCard(false)}>
                    <img src={arrow} alt="arrow"/>
                    Capsule Details
                    </div>
                    <div className={style.capsuleSerialContainer}>
                        <div> Id: {singleCapsuleData?.capsule_id}</div>
                        <div>Serial: {singleCapsuleData?.capsule_serial}</div>
                    </div>
                    <div className={style.capsuleDetails}>
                        {
                            singleCapsuleData?.details
                        }
                    </div>
                    <div className={style.capsuleLandingReuseContainer}>
                        <div>Number of Landings: {singleCapsuleData?.landings}</div>
                        <div>Number of Reuse: {singleCapsuleData?.reuse_count}</div>
                    </div>
                    <div className={style.capsuleStatusAndTypeContainer}>
                        <div className={`${singleCapsuleData.status=="active"? `${style.capsuleActiveContainer}` : singleCapsuleData.status=="unknown"?`${style.CapsuleUnknownContainer}`: `${style.CapsuleRetiredContainer}`}` }>
                            {
                                singleCapsuleData.status
                            }
                        </div>
                        <div>
                            {
                                singleCapsuleData.type
                            }
                        </div>
                    </div>
                    {
                        singleCapsuleData.missions.length>0&&
                    <div className={style.capsuleMissionsContainer}>
                        <div>List of Missions</div>
                        <div className={style.allMissionsContainer}>
                        {
                            singleCapsuleData?.missions?.map((mission)=>{
                                return<div className={style.SingleMissionCard}>
                                    <div>Name: {mission.name}</div>
                                    <div>Flight: {mission.flight}</div>
                                </div>
                            })
                        }
                        </div>
                    </div>
                    }
                </div>
            </div>
        }
        </>
    )
}