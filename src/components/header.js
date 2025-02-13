import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../assets/CRLogo.png';
import Casco from '../assets/cascoPerfil.png'
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();

  const goChampionships = () => {
    navigate("/campeonatos");
  }

  const goHome = () => {
    navigate("/Home");
  }

  const goRaces = () => {
    navigate("/carreras");
  }


  return (
    <div className='container'>
      <header class="d-flex flex-wrap justify-content-center py-4 mb-4">
      <a onClick={goHome} class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={Logo} class="bi me-2" width="50" height="auto"></img>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item nav-link" onClick={goChampionships}>Championships</li>
        <li class="nav-item nav-link" onClick={goRaces}>Races</li>
        <li class="nav-item nav-link"><img src={Casco} width="40" height="auto" alt='Casco Perfil'></img></li>
      </ul>
    </header>
    </div>
  );
}

export default Header