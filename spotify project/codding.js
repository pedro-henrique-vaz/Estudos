const express = require('express');
const {Router} = require("express");
const {router} = require("express/lib/application");
const app = express();

let playersStatus = [];

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
function getCurrentIndex(index, songs) {
    return songs[index];
}

app.use(express.static('public'));

app.use((req, res, next) => {
    let player = playersStatus.find(el => el.ip === req.socket.remoteAddress);
    if (!player) {
        player = {ip: req.socket.remoteAddress, index: 0, songs: [...songs]}
        playersStatus.push(player)
    }
    req.app.locals.player = player
    next()
    console.log(req.path, player.ip, player.songs[player.index])
})

app.get('/song', (req, res) => {
    let player = req.app.locals.player

    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/next-song', (req, res) => {
    let player = req.app.locals.player
    if (player.index === player.songs.length - 1) {
        player.index = 0;
    } else {
        player.index += 1
    }
    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/previous-song', (req, res) => {
    let player = req.app.locals.player
    if(player.index === 0){
        player.index = player.songs.length - 1;
    }
    else {
        player.index -= 1;
    }
    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/shuffle', (req, res) => {
    let player = req.app.locals.player

    const size = player.songs.length;
    let nowIndex = size - 1;
    while(nowIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = player.songs[nowIndex];
        player.songs[nowIndex] = player.songs[randomIndex];
        player.songs[randomIndex] = aux;
        nowIndex -= 1;
    }
    res.json();
})

app.get('/unshuffle', (req, res) => {
    let player = req.app.locals.player
    player.songs = [...songsOrigin]
    res.json()
})

app.get('/like/:id', (req, res) => {
    let player = req.app.locals.player
    const songId = req.params.id.player
    const result = player.songs.find(s => s.id === +songId)
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