const express = require('express');
const {Router} = require("express");
const {router} = require("express/lib/application");
const app = express();

let songs = [
    {
        id: 1,
        songName: "Bad Boys",
        file: "http://192.168.1.11:1212/songs/bad_boys.mp3",
        cover: 'http://192.168.1.11:1212/img/bad_boys.png',
        artist: "Inner Cycle",
        liked: false
    },
    {
        id: 2,
        songName: "Havana",
        file: "http://192.168.1.11:1212/songs/havana.mp3",
        cover: "http://192.168.1.11:1212/img/havana.png",
        artist: "Camila Cabello",
        liked: false
    },
    {
        id: 3,
        songName: "Save Yours Tears",
        file: "http://192.168.1.11:1212/songs/save_yours_tears.mp3",
        cover: "http://192.168.1.11:1212/img/save_yours_tears.png",
        artist: "The Weeknd",
        liked: false
    },
    {
        id: 4,
        songName: "333",
        file: "http://192.168.1.11:1212/songs/333.mp3",
        cover: "http://192.168.1.11:1212/img/333.png",
        artist: "Matuê",
        liked: false
    },
    {
        id: 5,
        songName: "777-666",
        file: "http://192.168.1.11:1212/songs/777-666.mp3",
        cover: "http://192.168.1.11:1212/img/777-666.png",
        artist: "Matuê",
        liked: false
    },
    {
        id: 6,
        songName: "Melhor Eu Ir",
        file: "http://192.168.1.11:1212/songs/melhor_eu_ir.mp3",
        cover: "http://192.168.1.11:1212/img/melhor_eu_ir.png",
        artist: "Péricles",
        liked: false
    }
]

let songsOrigin = [...songs]
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
    songs = [...songsOrigin]
    res.json()
})

app.get('/like/:id', (req, res) => {
    const songId = req.params.id
    const result = songs.find(s => s.id === +songId)
    if (!result) {
        res.status(404)
        res.json("não existe")
        return
    }
    result.liked = !result.liked;
    res.json(result.liked);
})

app.listen(1212, () => {
    console.log('Server is running in port 1212');
});