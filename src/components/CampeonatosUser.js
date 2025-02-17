import React, { useEffect, useState } from "react";
import Casco from "../assets/helmet.png";

function CampeonatosUser({ championship }) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await fetch(`https://localhost:7033/api/RacesApi/byChampionship/${championship.id}`);
        
                if (!response.ok) {
                    if (response.status === 404) {
                        console.warn("No se encontraron carreras.");
                        setRaces([]);
                        return;
                    }
                    throw new Error(`Error en la API: ${response.status}`);
                }
        
                const data = await response.json();
                console.log("Datos recibidos:", data); // Verificar estructura en consola
        
                setRaces(Array.isArray(data.$values) ? data.$values : []); // Acceder a `$values`
            } catch (error) {
                console.error("Error fetching races:", error);
                setRaces([]); // Asegurar que `races` sea un array vacío en caso de error
            } finally {
                setLoading(false);
            }
        };

        if (championship?.id) {
            fetchRaces();
        }
    }, [championship]);

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log("Ejemplo de carrera antes de filtrar:", races[0]);

    // Encontrar la próxima carrera
    const now = new Date();
    const upcomingRaces = races.filter((race) => {
    console.log("Procesando carrera:", race);
    return new Date(race.date) > now;
});

console.log("Carreras futuras:", upcomingRaces);

const nextRace = upcomingRaces.sort((a, b) => new Date(a.date) - new Date(b.date))[0];

console.log("Próxima carrera seleccionada:", nextRace);

    console.log("Próxima carrera encontrada:", nextRace);
    console.log("Fecha procesada de la próxima carrera:", new Date(nextRace.date));

    // Calcular tiempo restante
    let timeRemaining = "No upcoming races";
    if (nextRace) {
        const raceDate = new Date(nextRace.date);
        const diffMs = raceDate - now;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        timeRemaining = `${days}d ${hours}h`;
    }

    return (
        <div>
            <div className="d-flex justify-content-between campeonatoPreview">
                <div>
                    <h6>{championship.name}</h6>
                    <p>Next race in: {timeRemaining}</p>
                </div>
                <div className="d-flex mt-4 me-3 gap-2">
                    <img src={Casco} alt="Casco icono" width="20" height="20" />
                    <h6>
                        {races.reduce(
                                (total, race) =>
                                total + (race.participationRace?.$values ? race.participationRace.$values.length : 0),
                                                 0
                                                            )}
                    </h6>                
                </div>
            </div>
        </div>
    );
}

export default CampeonatosUser;


