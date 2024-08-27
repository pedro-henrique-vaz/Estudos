const express = require('express');
const {Router} = require("express");
const app = express();

app.use(express.static('public'));
// app.use(express.json());

// const route = Router()

// app.get('/bad_boys', (req, res) => {
//     const badboys = {
//         songName: "Bad Boys",
//         file: "http://localhost:3333/bad_boys.mp3",
//         cover: 'http://localhost:3333/bad_boys.png',
//         artist: "Inner Cycle",
//         liked: false
//     }
//     res.json(badboys);
// });
//
// app.get('/havana', (req, res) => {
//     const havana = {
//         songName: "Havana",
//         file: "http://localhost:3333/havana.mp3",
//         cover: "http://localhost:3333/havana.png",
//         artist: "Camila Cabello",
//         liked: false
//     }
//     res.json(havana);
// });
//
// app.get('/saveyourstears', (req, res) => {
//     const saveyourstears = {
//         songName: "Save Yours Tears",
//         file: "http://localhost:3333/save_yours_tears.mp3",
//         cover: "http://localhost:3333/save_yours_tears.png",
//         artist: "The Weeknd",
//         liked: false
//     }
//     res.json(saveyourstears);
// });

app.listen(3333, () => {
    console.log('Rodando na porta 3333');
});