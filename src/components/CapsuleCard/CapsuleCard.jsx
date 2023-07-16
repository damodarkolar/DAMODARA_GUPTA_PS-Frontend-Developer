
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'



export const CapsuleCard = (props) => {

    const capsuleId = props.CapsulesBoXCapsuleCard;

        const {     
            singleCapsuleDataLoading,
            singleCapsuleDataErr,
            singleCapsuleData,
        } = useSelector(state=> state.Capsule);
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(fetchSingleCapsuleData(capsuleId))
        },[])

    return (
        <>
        {singleCapsuleDataLoading ? <div className={"capsuleCardLoader"}>CapsuleData Loading</div>:
            <div className={"capsuleCardContainer"}>
                {
                    singleCapsuleData.capsule_serial
                }
            </div>
        }
        </>
    )
}