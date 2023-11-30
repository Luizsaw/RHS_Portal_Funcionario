import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { getUserEmail } from '../../Routes/Private';
import './folha.css';

export default function ControlePonto() {
  const [userId, setUserId] = useState(null);
  const [folhas, setFolhas] = useState([]);
  const [downloadFolha, setDownloadFolha] = useState(null);

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
        handleExibirFolhasEmitidas(data.userId);
      } else {
        console.error('Erro na solicitação HTTP:', response.status);
      }
    } catch (error) {
      console.error('Erro na solicitação HTTP:', error);
    }
  };

  const handleExibirFolhasEmitidas = async (userId) => {
    if (userId !== undefined) {
      try {
        const response = await fetch(`http://localhost:3333/api/folha-pagamento/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFolhas(data);
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

  const handleDownloadFolha = async (userId, nomeArquivo) => {
    if (userId !== undefined) {
      try {
        const response = await fetch(`http://localhost:3333/api/download-folha-pagamento/${userId}`);
        if (response.ok) {
          const data = await response.blob(); // Certifique-se de que o servidor retorna o conteúdo como Blob
          setDownloadFolha(data);

          // Realize o download
          const url = URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = nomeArquivo;
          a.click();

          // Limpe a URL temporária
          URL.revokeObjectURL(url);
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
            <th>ID Funcionário</th>
            <th>Nome do Arquivo</th>
            <th>Data de Emissão</th>
            <th>Arquivo</th>
          </tr>
        </thead>
        <tbody>
          {folhas.map((folha) => (
            <tr key={folha.id}>
              <td>{folha.id}</td>
              <td>{folha.id_funcionario}</td>
              <td>{folha.nome_arquivo}</td>
              <td>{folha.data_emissao}</td>
              <td>
                <button onClick={() => handleDownloadFolha(userId, folha.nome_arquivo)} className="custom-button">
                  Baixar PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
