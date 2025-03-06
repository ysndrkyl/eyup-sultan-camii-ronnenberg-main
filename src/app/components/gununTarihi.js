"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function GununTarihi() {
  const [miladiTakvim, setMiladiTakvim] = useState("");
  const [hicriTakvim, setHicriTakvim] = useState("");

  function getData() {
    try {
      const vakitler = JSON.parse(localStorage.getItem("ezan-vakitleri"));
      const nowVakit = vakitler.find(
        (vakit) =>
          vakit.MiladiTarihKisa == new Date().toLocaleDateString("tr-TR")
      );

      setMiladiTakvim(nowVakit.MiladiTarihUzun);
      setHicriTakvim(nowVakit.HicriTarihUzun);
    } catch (err) {
      setMiladiTakvim({ response: "error" });
    }
  }

  useEffect(() => {
    getData();

    setInterval(getData, 3600000);
  }, []);

  if (miladiTakvim.response) {
    return <h1>Hata, lütfen tekrar deneyin.</h1>;
  } else {
    return (
      <div className={styles.dateArea}>
        <span className={styles.hicri}>{hicriTakvim ? hicriTakvim : "Yükleniyor..."}</span>
        <br></br>
        <span className={styles.miladi}>{miladiTakvim ? miladiTakvim : "Yükleniyor..."}</span>
      </div>
    );
  }
}
