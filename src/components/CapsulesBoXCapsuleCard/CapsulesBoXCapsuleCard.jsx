





export const CapsuleBoxCapsuleCard = ( props ) => {
    console.log("props",props)
    return(
        <>
        <div className={"capsulesBoxCapsuleCard"}>
            {props.capsuleData.capsule_serial}
        </div>
        </>
    )
}