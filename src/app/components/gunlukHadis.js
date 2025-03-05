"use client"

import { useState, useEffect } from "react"
import styles from '../page.module.css'

export default function GunlukHadis(){

    const [hadisler,setHadisler] = useState([])
    const [selectedHadis,setSelectedHadis] = useState([])

    async function getData() {
        try{
            const haditsFetch = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/tur-bukhari/sections/0.min.json')
            const haditsResponse = await haditsFetch.json()
            setHadisler(haditsResponse)

            const nowDate = new Date()
            const day = nowDate.getDate()
            const month = nowDate.getMonth()
            const hadithNumber = (day + month) % haditsResponse.hadiths.length

            setSelectedHadis(haditsResponse.hadiths[hadithNumber])
        }
        catch(err){
            setHadisler({response:"error"})
        }
    }

    useEffect(() => {
        getData()
        setInterval(getData, 3600000);
    },[])

    if(hadisler.response){
        return (
            <h1>Hata, lütfen tekrar deneyin.</h1>
        )
    }
    else{
        return (
            <div className={styles.toolDiv}>
                <span>{selectedHadis ? selectedHadis.text :  "Yükleniyor..."}</span>
                <br></br>
                <br></br>
                <span>Hadis Numarası: {selectedHadis ? selectedHadis.hadithnumber :  "Yükleniyor..."} Kitap: {hadisler.metadata ? hadisler.metadata.name : "Yükleniyor..."}</span>
            </div>
        )
    }
}