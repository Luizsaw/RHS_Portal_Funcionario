import React, { useState } from "react";
import Header from "../../Components/Header";
import "./mensagem.css";

export default function Mensagens() {
  // estado local para armazenar os dados do formulário
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    //adicionar a lógica para processar o envio da mensagem, enviá-la por e-mail ou armazená-la em um banco de dados.
    console.log("Assunto:", assunto);
    console.log("Mensagem:", mensagem);
    // Limpar os campos do formulário após o envio
    setAssunto("");
    setMensagem("");
  };

  return (
    <div>
      <Header />
      <form className="form-mensagem" onSubmit={handleSubmit}>
        <h2>Envie uma mensagem para o suporte:</h2>
        <label htmlFor="assunto">Assunto:</label>
        <input
          type="text"
          id="assunto"
          name="assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required
        />
        <label htmlFor="mensagem">Mensagem:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}
