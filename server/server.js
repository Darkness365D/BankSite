const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();

app.use(bodyParser.json());

// API для регистрации
app.post('/register', async (req, res) => {
  const { name, phoneNumber, password, birthday, genderId } = req.body;

  try {
    // Проверка, что genderId равен 1 или 2
    if (genderId !== 1 && genderId !== 2) {
      return res.status(400).send({ error: 'Неправильное значение для пола' });
    }

    const [result] = await db.execute('INSERT INTO KpUser (name, phoneNumber, password, birthday, genderId) VALUES (?, ?, ?, ?, ?)', [name, phoneNumber, password, birthday, genderId]);
    res.status(201).send({ id: result.insertId, name, phoneNumber, birthday, genderId });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).send({ error: 'Что-то пошло не так при регистрации' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});