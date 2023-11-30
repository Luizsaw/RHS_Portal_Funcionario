import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { getUserEmail } from '../../Routes/Private';
import './Controle_ponto.css';

export default function ControlePonto() {
  const [userId, setUserId] = useState(null);
  const [pontos, setRegistro] = useState([]);

  useEffect(() => {
    const userEmail = getUserEmail();

    if (userEmail) {
      fetchUserId(userEmail);
    }
  }, []);

  const fetchUserId = async (userEmail) => {
    try {
      const response = await fetch(`http://localhost:3333/api/obter-id-usuario?email=${userEmail}`);

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
        handleExibirRegistro(data.userId);
      } else {
        console.error('Erro na solicitação HTTP:', response.status);
      }
    } catch (error) {
      console.error('Erro na solicitação HTTP:', error);
    }
  };

  const handleExibirRegistro = async (userId) => {
    if (userId !== undefined) {
      try {
        const response = await fetch(`http://localhost:3333/api/pontos/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRegistro(data);
        } else {
          console.error('Erro ao obter os dados do servidor');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação', error);
      }
    } else {
      console.error('userId é undefined. Certifique-se de que a solicitação para obter o ID do usuário seja bem-sucedida.');
    }
  };

  return (
    <div className="controle-ponto">
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Funcionário</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td>{ponto.id}</td>
              <td>{ponto.id_funcionario}</td>
              <td>{ponto.data}</td>
              <td>{ponto.hora}</td>
              <td>{ponto.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
