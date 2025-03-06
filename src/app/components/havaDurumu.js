"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function HavaDurumu() {
  const [nowVakit, setNowVakit] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  async function getData() {
    try {
      const vakitler = JSON.parse(localStorage.getItem("ezan-vakitleri"));

      setNowVakit(
        vakitler.find(
          (vakit) =>
            vakit.MiladiTarihKisa == new Date().toLocaleDateString("tr-TR")
        )
      );

      const weatherFetch = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=2c6975609a6b4779a1094156240911&q=GERMANY NIEDERSACHSEN HANNOVER&aqi=no"
      );
      const weatherResponse = await weatherFetch.json();
      setWeatherData(weatherResponse);
    } catch (err) {
      setWeatherData({ response: "error" });
    }
  }

  useEffect(() => {
    getData();

    setInterval(getData, 3600000);
  }, []);

  if (weatherData.response) {
    return <h1>Hata, lütfen tekrar deneyin.</h1>;
  } else {
    return (
      <div className={styles.weather}>
        {/* <img src={nowVakit ? nowVakit.AyinSekliURL : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}></img> */}
        <div className={styles.weatherIcons}>
          <img
            src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-sun-icon-logo-png-png-image_5687131.png"
            width={75}
            height={75}
          ></img>
          <img
            src="https://cdn-icons-png.freepik.com/512/12609/12609946.png?ga=GA1.1.1959818392.1740777294"
            width={50}
            height={50}
          ></img>
          {/* <img
            src={
              weatherData.length !== 0
                ? weatherData.current.condition.icon
                : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
            }
          ></img> */}
        </div>
        <div className={styles.weatherText}>
          <span>{nowVakit ? nowVakit.GunesDogus : "Yükleniyor..."}</span>

          <span className={styles.text}>
            {nowVakit ? nowVakit.GunesBatis : "Yükleniyor..."}
          </span>
        </div>
        <div className={styles.weatherCurrent}>
          <span>Hava Durumu</span>
          <span>
            Castrop{" "}
            {weatherData.length !== 0
              ? weatherData.current.temp_c + "°C"
              : "Yükleniyor..."}
          </span>
        </div>
      </div>
    );
  }
}
