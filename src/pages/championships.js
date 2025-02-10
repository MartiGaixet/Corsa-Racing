import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import CampeonatosUser from "../components/CampeonatosUser";

function Championships() {
    const [championships, setChampionships] = useState([]);
  
    useEffect(() => {
      const fetchChampionships = async () => {
          const response = await axios.get("https://localhost:7033/api/ChampionshipsApi");
          setChampionships(response.data);
      };
      fetchChampionships();
    }, []);


      
    return(
        <div className="bodyOthers">
            <Header></Header>
            <h2 className="othersSubtitles">My championships</h2>
            <div class="linea-blanca"></div>
            <div className="mt-5 d-flex flex-column align-items-center">
            {championships.length === 0 ? (
        <p>You're not enrolled in any championships.</p>
      ) : (
        championships.map((championship) => (
          <CampeonatosUser key={championship.id} championship={championship} />
        )))}
        <button className="botonMas mt-3">+</button>
            </div>   
        </div>
        
    );
}

export default Championships