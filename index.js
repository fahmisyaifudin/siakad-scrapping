const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const fileData = fs.readFileSync("./dist/nilai.json");

const nilaiData = JSON.parse(fileData);
const filterNilai = nilaiData.slice(3, -2).map((nilai) => {
  const [kode_mk, matkul, sks, nilai_huruf] = nilai;
  return {
    kode_mk,
    matkul,
    sks,
    nilai_huruf,
  };
});

let message = "";
filterNilai.forEach((element, index) => {
  message += `${index + 1}. ${element.kode_mk} - ${element.matkul} (${
    element.sks
  } sks) - ${element.nilai_huruf} \n`;
});

axios
  .request({
    method: "POST",
    url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    }),
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
