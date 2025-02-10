import React from "react";
import Casco from "../assets/helmet.png"


function RacesUser({ race }) {
    return(
        <div>
            <div className="card text-white dark-card">
                <div className="card-body">
                    <h5 className="card-title text-center">{race.Circuit}</h5>
                    <p className="card-text text-center">{race.Car}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-white">2d 13h</p>
                    <div className="d-flex align-items-center gap-2">
                        <img src={Casco} alt="Casco" width="20" height="20"></img>
                        <p className="mb-0">{race.Drivers.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RacesUser
