import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import RacesUser from "../components/RacesUser";

function Races() {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await axios.get("https://localhost:7033/api/RacesApi");
                console.log("Datos recibidos:", response.data);

                // Acceder a $values si existe, sino dejar un array vacío
                setRaces(Array.isArray(response.data.$values) ? response.data.$values : []);
            } catch (error) {
                console.error("Error fetching races:", error);
                setRaces([]);
            }
        };
        fetchRaces();
    }, []);

    return (
        <div className="bodyOthers">
            <Header />
            <h2 className="othersSubtitles">Upcoming races</h2>
            <div className="linea-blanca"></div>
            <div className="mt-5 d-flex justify-content-around flex-wrap">
                {races.length === 0 ? (
                    <div className="text-center w-100 d-flex justify-content-center">
                        <p>No upcoming races available.</p>
                    </div>
                ) : (
                    races.map((race) => <RacesUser key={race.id} race={race} />)
                )}
            </div>
        </div>
    );
}

export default Races;