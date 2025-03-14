const express = require("express");
const app = express();

const postbacks = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/postback", (req, res) => {
  console.log("RAW POSTBACK DATA:", JSON.stringify(req.body, null, 2)); // Логируем полученные данные

  if (!req.body.invoice_info || typeof req.body.invoice_info !== "object") {
    console.warn("❌ Warning: invoice_info пришел некорректным!", req.body.invoice_info);
  }

  postbacks.push(req.body);

  res.json({ message: "Postback received", data: req.body });
});

app.get("/postbacks", (req, res) => {
  res.json(postbacks);
});

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
