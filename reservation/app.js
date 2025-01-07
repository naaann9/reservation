"use strict";
const express = require("express");
const app = express();
app.use(express.json());

let reservations = []; // データはここに蓄積（本来はDBMSを使用）

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 予約作成
app.post("/create", (req, res) => {
    const { name, date, place1, place2, place3} = req.body;
    const id = reservations.length + 1;
    reservations.push({ id, name, date, place1, place2, place3});
    res.json({ message: "予約が作成されました", id });
});

// 予約一覧を取得
app.get("/list", (req, res) => {
    res.json(reservations);
});

// 特定の予約を取得
app.get("/view/:id", (req, res) => {
    const id = Number(req.params.id);
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).json({ error: "予約が見つかりません" });
    }
});

// 予約削除
app.delete("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    reservations = reservations.filter(r => r.id !== id);
    res.json({ message: "予約が削除されました" });
});

app.listen(8080, () => console.log("Reservation app listening on port 8080!"));
  