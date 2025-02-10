import React from "react";
import Casco from "../assets/helmet.png"


function RacesUser() {
    return(
        <div>
            <div className="d-flex flex-row gap-3">
                <div className="d-flex racePreview">
                    <div>
                        <h6>Campeonato</h6>
                        <p>Empieza en: 6d 3h</p>
                    </div>
                    <div className="text-end racepreviewDown">
                        <img src={Casco} alt="Casco icono"></img>
                        <p>32</p>
                    </div>
                </div>
                <div className="d-flex racePreview">
                    <div>
                        <h6>Campeonato</h6>
                        <p>Empieza en: 6d 3h</p>
                    </div>
                    <div className="text-end racePreviewFooter">
                        <img src={Casco} alt="Casco icono"></img>
                        <p>32</p>
                    </div>
                </div>
            </div>
            <button className="botonMas mt-3">+</button>
        </div>
    );
}

export default RacesUser
