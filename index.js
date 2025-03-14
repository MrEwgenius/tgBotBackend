const express = require("express");
const app = express();

const postbacks = []; // Храним полученные постбеки в памяти (очистится при перезапуске сервера)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Получение постбека
app.post("/postback", (req, res) => {
  const postbackData = req.body;
  postbacks.push(postbackData); // Добавляем в массив

  console.log("Получен постбек:", postbackData);

  res.json({ message: "Postback received", data: postbackData });
});

// Отображение всех полученных постбеков в виде JSON
app.get("/postbacks", (req, res) => {
  res.json(postbacks);
});

// Простая HTML-страница для отображения постбеков
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Postbacks</title>
        <style>
          body { font-family: Arial, sans-serif; }
          pre { background: #f4f4f4; padding: 10px; }
        </style>
      </head>
      <body>
        <h1>Postback Log</h1>
        <button onclick="loadPostbacks()">Обновить</button>
        <pre id="log">Загрузка...</pre>
        <script>
          async function loadPostbacks() {
            const res = await fetch('/postbacks');
            const data = await res.json();
            document.getElementById('log').textContent = JSON.stringify(data, null, 2);
          }
          loadPostbacks();
        </script>
      </body>
    </html>
  `);
});

app.listen(5000, () => {
  console.log("Сервер запущен на http://localhost:5000");
});
