import React from "react";
import Header from "../components/header"
import RacesUser from "../components/RacesUser";

function Races() {
    return(
        <div className="bodyOthers">
            <Header></Header>
            <h2 className="othersSubtitles">Upcoming races</h2>
            <div class="linea-blanca"></div>
            <div className="mt-5">
                <RacesUser></RacesUser>
            </div>
        </div>
        
    );
}

export default Races