import React from "react";
import Casco from "../assets/helmet.png";

function RacesUser({ race }) {
    
    const now = new Date();
    const raceDate = new Date(race.date);

    
    let timeRemaining = "Race finished";
    if (raceDate > now) {
        const diffMs = raceDate - now;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        timeRemaining = `${days}d ${hours}h`;
    }

    
    const driversCount = race.participationRace?.$values ? race.participationRace.$values.length : 0;

    return (
        <div>
            <div className="card text-white dark-card">
                <div className="card-body">
                    <h5 className="card-title text-center">{race.circuit}</h5>
                    <p className="card-text text-center">{race.car}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-white">{timeRemaining}</p>
                    <div className="d-flex align-items-center gap-2">
                        <img src={Casco} alt="Casco" width="20" height="20" />
                        <p className="mb-0">{driversCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RacesUser;
