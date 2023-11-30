
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3333;
const dbConfig = {
  host: 'berry.db.elephantsql.com',
  database: 'kwlriltm',
  port: '5432',
  user: 'kwlriltm',
  password: 'XSvdSkoe1d8aCwESg7DQsJ7ay6ADyEz5',
};

const pgp = require('pg-promise')();
const db = pgp(dbConfig);

app.use(cors());

app.get('/api/obter-id-usuario', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'O email não foi fornecido como parâmetro' });
  }

  try {
    const result = await db.query('SELECT id_funcionario FROM "RHS"."tb_funcionario" WHERE email = $1', [email]);
    if (result && result.length > 0) {
      const userId = result[0].id_funcionario;
      return res.json({ userId });
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados', error);
    return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});

app.get('/api/pontos/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'O ID do usuário não foi fornecido como parâmetro' });
  }

  try {
    const result = await db.query('SELECT * FROM "RHS"."tb_registro_ponto" WHERE id_funcionario = $1', [userId]);
    if (result && result.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ error: 'Folha de pagamento não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados', error);
    return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});

app.get('/api/folha-pagamento/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'O ID da folha de pagamento não foi fornecido como parâmetro' });
  }

  try {
    const result = await db.query('SELECT * FROM "RHS"."tb_folha_pagamento" WHERE id_funcionario = $1', [userId]);
    if (result && result.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ error: 'Folha de pagamento não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados', error);
    return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});

app.get('/api/download-folha-pagamento/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'O ID da folha de pagamento não foi fornecido como parâmetro' });
  }

  try {
    const result = await db.query('SELECT arquivo, nome_arquivo FROM "RHS"."tb_folha_pagamento" WHERE id_funcionario = $1', [userId]);
    if (result && result.length > 0) {
      const { arquivo, nome_arquivo } = result[0];

      // Defina o cabeçalho de resposta para o tipo de conteúdo apropriado (PDF neste caso)
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${nome_arquivo}"`);

      // Envie o conteúdo do arquivo como resposta
      res.send(arquivo);
    } else {
      return res.status(404).json({ error: 'Folha de pagamento não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados', error);
    return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});


app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
