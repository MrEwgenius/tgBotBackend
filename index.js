const express = require("express");
const app = express();

// Добавляем middleware для обработки JSON
app.use(express.json());

// Добавляем middleware для обработки данных в формате x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post("/postback", (req, res) => {
  const { status, invoice_id, amount_crypto, currency, order_id, token } =
    req.body;

  res.json({
    message: "Postback received",
    status: status,
    invoice_id: invoice_id,
    amount_crypto: amount_crypto,
    currency: currency,
    order_id: order_id,
    token: token,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
