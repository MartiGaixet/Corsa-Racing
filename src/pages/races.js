import React, { useEffect, useState } from "react";
import Header from "../components/header"
import axios from "axios";
import RacesUser from "../components/RacesUser";

function Races() {
    const [races, setRaces] = useState([]);
  
    useEffect(() => {
      const fetchRaces = async () => {
          const response = await axios.get("https://localhost:7033/api/RacesApi");
          setRaces(response.data);
      };
      fetchRaces();
    }, []);

    return(
        <div className="bodyOthers">
            <Header></Header>
            <h2 className="othersSubtitles">Upcoming races</h2>
            <div class="linea-blanca"></div>
            <div className="mt-5 d-flex justify-content-between flex-wrap">
            {races.length === 0 ? (
                <div className="text-center w-100 d-flex justify-content-center">
                    <p>There's no races right now</p>
                </div>
      ) : (
        races.map((race) => (
          <RacesUser key={race.id} race={race} />
        )))}
            </div>
        </div>
        
    );
}

export default Races