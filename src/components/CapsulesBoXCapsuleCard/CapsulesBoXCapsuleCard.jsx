import style from "./CapsulesBoXCapsuleCard.module.css"





export const CapsuleBoxCapsuleCard = ( props ) => {
    const { capsuleData, setSingleCapsuleNumber, setShowSingleCapsuleCard } = props

    const handleOnclick =()=>{
        setShowSingleCapsuleCard(true)
        setSingleCapsuleNumber(capsuleData.capsule_serial)
    }
    return(
        <>
        <div onClick={handleOnclick} className={style.capsulesBoxCapsuleCardContainer} >
            <div className={style.capsuleIdSerialContainer}>
                <div className="">
                    {
                        capsuleData?.capsule_id
                    }
                </div>
                <div className="">
                    {
                        capsuleData?.capsule_serial
                    }
                </div>
            </div>
            <div className={style.capsuleDetailsContainer}>
                {
                    capsuleData.details
                }
            </div>
            <div className={`${capsuleData.status=="active"? `${style.capsuleActiveContainer}` : capsuleData.status=="unknown"?`${style.CapsuleUnknownContainer}`: `${style.CapsuleRetiredContainer}`}` }>
                {
                    capsuleData.status
                }
            </div>
        </div>
        </>
    )
}