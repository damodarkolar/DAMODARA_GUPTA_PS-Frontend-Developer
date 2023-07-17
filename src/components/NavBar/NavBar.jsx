import React from "react"
import style from "./NavBar.module.css"
import spaceXLogo from "../../assests/spacexLogo.png"
import userIcon from "../../assests/User.svg";
import hamberger from "../../assests/habmberger.svg"


const Navbar = () => {
    return(
        <>
            <div className={style.navBarContainer}>
                <div className={style.NavBarHambergerContainer}>
                    <img src={hamberger} alt="hamberger" />
                </div>
                <div className={style.navBarImagesContainer}>
                <img src={spaceXLogo} alt="spaceXLogo" />
                </div>
                <div className={style.NavBarUserIconContainer}>
                <img src={userIcon} alt="userIcon" />

                </div>

                {/* <div className={style.NavBarHambergerContainer}>
                </div>
                <div className={style.NavBarLogoContainer}>
                </div>
                <div className={style.NavBarUserIconContainer}>
                </div> */}
            </div>
        </>
    )
}


export default Navbar