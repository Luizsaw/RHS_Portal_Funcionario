import './admin.css';
import React from 'react';
import Header from '../../Components/Header';
import AppAndroid from '../../Assets/AppRegistro.png';
import ilustracao from '../../Assets/ilustracao_1.png';
import { Link } from "react-router-dom";

export default function ModernDesign() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content-Text">
          <h1 className="Title-home">Bem-vindo ao Portal</h1>
          <p className="Introduction">
            Ficamos extremamente felizes por tê-lo como parte da nossa equipe!
          </p>
          <p className="Introduction">
            Nosso objetivo é tornar a sua experiência o mais simples e conveniente possível, oferecendo acesso fácil às informações essenciais. Agora você pode baixar suas folhas de pagamento e consultar o seu registro de ponto com facilidade. Estamos aqui para tornar sua vida mais prática e produtiva!
          </p>
          <img className="ilustracao" src={ilustracao} />
        </div>
        <div className="content">
          <div className="content-inner">
            <img className="AppAndroid" src={AppAndroid} />
            <p className="Introduction">
              Faça o download e instale nosso aplicativo Android para realizar seus registros de ponto.
            </p>
            <Link to="/mobile-download" className="Mobile-link">Download do APK</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
