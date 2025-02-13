import React from "react";
import Casco from "../assets/helmet.png"


function CampeonatosUser({ championship }) {
    return(
        <div>
                <div className="d-flex justify-content-between campeonatoPreview">
                    <div>
                        <h6>{championship.name}</h6>
                        <p>Siguiente carrera en: 6d 3h</p>
                    </div>
                    <div className="d-flex mt-4 me-3 gap-2">
                        <img src={Casco} alt="Casco icono" width="20" height="20"></img>
                        <h6>{championship.Races.reduce((total, race) => total + (race.ParticipationRace ? race.ParticipationRace.length : 0), 0)}</h6>
                    </div>
                </div>
        </div>
    );
}

export default CampeonatosUser

