"use strict";

// 予約作成フォームの送信イベント
document.querySelector("#create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const date = document.querySelector("#date").value;
    const place1 = document.querySelector("#place1").checked ? "会議室１" : null;
    const place2 = document.querySelector("#place2").checked ? "会議室２" : null;
    const place3 = document.querySelector("#place3").checked ? "ラウンジ" : null;
    const place = place1 || place2 || place3;

    if (!place) {
        alert("場所を選択してください");
        return;
    }

    fetch("/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            date,
            place1: place === "会議室１",
            place2: place === "会議室２",
            place3: place === "ラウンジ",
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            loadSchedule(); // 予約スケジュールも更新
        });
});


// 予約されている場所と時間を表示
function loadSchedule() {
    fetch("/list")
        .then((res) => res.json())
        .then((data) => {
            const scheduleContainer = document.querySelector("#schedule");
            scheduleContainer.innerHTML = ""; // リセット

            data.forEach((reservation) => {
                const place = reservation.place1
                    ? "会議室１"
                    : reservation.place2
                    ? "会議室２"
                    : "ラウンジ";

                const div = document.createElement("div");
                div.textContent = `日付: ${reservation.date}, 場所: ${place}, 名前: ${reservation.name}`;
                scheduleContainer.appendChild(div);
            });
        });
}

// 初期ロード
loadSchedule();


