const express = require('express');
const {Router} = require("express");
const {router} = require("express/lib/application");
const app = express();

let songs = [
    {
        songName: "Bad Boys",
        file: "http://localhost:1212/songs/bad_boys.mp3",
        cover: 'http://localhost:1212/img/bad_boys.png',
        artist: "Inner Cycle",
        liked: false
    },
    {
        songName: "Havana",
        file: "http://localhost:1212/songs/havana.mp3",
        cover: "http://localhost:1212/img/havana.png",
        artist: "Camila Cabello",
        liked: false
    },
    {
        songName: "Save Yours Tears",
        file: "http://localhost:1212/songs/save_yours_tears.mp3",
        cover: "http://localhost:1212/img/save_yours_tears.png",
        artist: "The Weeknd",
        liked: false
    }
]

let currentIndex = 0;
function getCurrentIndex() {
    return songs[currentIndex];
}

app.use(express.static('public'));

app.get('/song', (req, res) => {
    res.json(getCurrentIndex());
})

app.get('/next-song', (req, res) => {
    if(currentIndex === songs.length - 1){
        currentIndex = 0;
    }
    else {
        currentIndex += 1;
    }
    res.json(getCurrentIndex());
})

app.get('/previous-song', (req, res) => {
    if(currentIndex === 0){
        currentIndex = songs.length - 1;
    }
    else {
        currentIndex -= 1;
    }
    res.json(getCurrentIndex());
})

app.get('/shuffle', (req, res) => {
    const size = songs.length;
    let nowIndex = size - 1;
    while(nowIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = songs[nowIndex];
        songs[nowIndex] = songs[randomIndex];
        songs[randomIndex] = aux;
        nowIndex -= 1;
    }

    res.json()
})

app.get('/unshuffle', (req, res) => {


    res.json()
})

app.listen(1212, () => {
    console.log('Server is running in port 1212');
});