import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import CampeonatosUser from "../components/CampeonatosUser";
import CrearCampeonato from "../components/CrearCampeonato";

function Championships() {
  const [championships, setChampionships] = useState([]);
  const [filteredChampionships, setFilteredChampionships] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Obtener el ID del usuario almacenado en localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        // 1️⃣ Obtener todos los campeonatos
        const response = await axios.get("https://localhost:7033/api/ChampionshipsApi");
        const allChampionships = response.data.$values || response.data || [];

        // 2️⃣ Filtrar los campeonatos en los que el usuario participa
        const championshipsWithParticipation = [];

        for (const championship of allChampionships) {
          const racesResponse = await axios.get(`https://localhost:7033/api/RacesApi/byChampionship/${championship.id}`);
          const races = racesResponse.data.$values || racesResponse.data || [];

          // Verificar si alguna carrera tiene al usuario en ParticipationRace
          const userInChampionship = races.some(race =>
            race.participationRace?.$values?.some(participation => participation.userId == userId)
          );

          if (userInChampionship) {
            championshipsWithParticipation.push(championship);
          }
        }

        // 3️⃣ Guardar solo los campeonatos donde participa el usuario
        setFilteredChampionships(championshipsWithParticipation);
      } catch (error) {
        console.error("Error fetching championships:", error);
      }
    };

    if (userId) {
      fetchChampionships();
    }
  }, [userId]);

  return (
    <div className="bodyOthers">
      <Header />
      <h2 className="othersSubtitles">My championships</h2>
      <div className="linea-blanca"></div>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div>
          {filteredChampionships.length > 0 ? (
            filteredChampionships.map((championship, index) => (
              championship ? (
                <CampeonatosUser key={championship.id || index} championship={championship} />
              ) : null
            ))
          ) : (
            <p>You're not enrolled in any championships.</p>
          )}
        </div>

        <button className="botonMas mt-3" onClick={() => setShowModal(true)}>+</button>

        <CrearCampeonato show={showModal} handleClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

export default Championships;
