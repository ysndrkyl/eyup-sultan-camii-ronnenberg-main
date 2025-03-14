"use client";

import EzanVakitleri from "./components/ezanVakitleri.js";
import KalanVakit from "./components/kalanVakit.js";
import HavaDurumu from "./components/havaDurumu.js";
import GununTarihi from "./components/gununTarihi.js";
import GunlukHadis from "./components/gunlukHadis.js";

import styles from "./page.module.css";
import Image from "next/image";
import logo from "../img/logo.jpg";
import "./main.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Image src={logo} alt="eyupsultancamii" className={styles.logo} />
        <div className={styles.titleArea}>
          <div className={styles.title}>DİTİB EYÜP SULTAN CAMİİ RONENNBERG</div>
          <div className={styles.title}>Gemeinde zu Castrop-Rauxel e.U.</div>
        </div>
        <div className={styles.weather}>
          <HavaDurumu />
        </div>
      </div>
      <div className={styles.bottomContainer}>
      <div className={styles.containerHadis}>
          <KalanVakit />
          <GunlukHadis />
        </div>
        <div className={styles.containerTimes}>
          <GununTarihi />
          <EzanVakitleri />
        </div>
    
      </div>
    </div>
  );
}
