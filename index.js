const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const fileData = fs.readFileSync("./dist/nilai.json");
const arraySemester = process.env.SEMESTER.split(" ");

const nilaiData = JSON.parse(fileData);
const indexNilai = nilaiData.findIndex(
  (x) => x[0].includes(arraySemester[0]) && x[0].includes(arraySemester[1])
);
const filterNilai = nilaiData.slice(indexNilai + 2, -2).map((nilai) => {
  const [kode_mk, matkul, sks, nilai_huruf] = nilai;
  return {
    kode_mk: kode_mk.trim(),
    matkul: matkul.trim(),
    sks: sks.trim(),
    nilai_huruf: nilai_huruf.trim(),
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
