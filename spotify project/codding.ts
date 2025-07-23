import express from 'express';
import mysql from "mysql2/promise";
import {Connection} from "mysql2/typings/mysql/lib/Connection";
const app = express();

let connection: Connection;
mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'spotity',
}).then(c => {
    connection = c
});

let playersStatus = [];

const serverIp = "192.168.1.108"
const serverPort = 1212;
const serverUrl = `http://${serverIp}:${serverPort}`;

let songs = [
    {
        id: 1,
        songName: "Bad Boys",
        file: `${serverUrl}/src/testes/bad_boys.mp3`,
        cover: `${serverUrl}/src/testes/bad_boys.png`,
        artist: "Inner Cycle",
        liked: false
    },
    {
        id: 2,
        songName: "Havana",
        file: `${serverUrl}/src/testes/havana.mp3`,
        cover: `${serverUrl}/src/testes/havana.png`,
        artist: "Camila Cabello",
        liked: false
    },
    {
        id: 3,
        songName: "Save Yours Tears",
        file: `${serverUrl}/src/testes/save_yours_tears.mp3`,
        cover: `${serverUrl}/src/testes/save_yours_tears.png`,
        artist: "The Weeknd",
        liked: false
    },
    {
        id: 4,
        songName: "333",
        file: `${serverUrl}/src/testes/333.mp3`,
        cover: `${serverUrl}/src/testes/333.png`,
        artist: "Matuê",
        liked: false
    },
    {
        id: 5,
        songName: "777-666",
        file: `${serverUrl}/src/testes/777-666.mp3`,
        cover: `${serverUrl}/src/testes/777-666.png`,
        artist: "Matuê",
        liked: false
    },
    {
        id: 6,
        songName: "Melhor Eu Ir",
        file: `${serverUrl}/src/testes/melhor_eu_ir.mp3`,
        cover: `${serverUrl}/src/testes/melhor_eu_ir.png`,
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
        player = {ip: req.socket.remoteAddress, index: 0, songs: [...songs.map(song => ({ ...song}))]};
        playersStatus.push(player)
    }
    req.app.locals.player = player
    req.app.locals.user_id = 1
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

// app.get('/like/:id', (req, res) => {
//     let player = req.app.locals.player
//     const songId = req.params.id
//     const result = player.songs.find(s => s.id === +songId)
//     if (!result) {
//         res.status(404)
//         res.json("não existe")
//         return
//     }
//     result.liked = !result.liked;
//     res.json(result.liked);
// })

app.post('/like/:id', async (req, res) => {
    let userId = req.app.locals.user_id
    const songId = req.params.id
    const [r, f] = await connection.query(`select * from spotity.like where user_id = ${userId} and song_id = ${songId}`)
    if (!r || r.length === 0) {
        res.status(404)
        res.json("não existe")
        return
    }
    const [g,h] = await connection.query(`update spotity.like set likes = 1 where likes = 0;`)
    const song = r[0];
    song.likes = !song.likes;
    res.json(song.likes);
})

app.get('/artists', async (req, res) => {
    const [r, f] = await connection.query(`select * from artists where name like '%${req.query.name}%'`)
    res.json(r);
})


app.get('/album', async (req, res) => {
    const [r, f] = await connection.query(`select * from album where name like '%${req.query.name}%'`)
    res.json(r);
})


app.get('/songs', async (req, res) => {
    const [r, f] = await connection.query(`select * from songs where name like '%${req.query.name}%'`)
    res.json(r);
})

app.get('/album/:id/songs', async (req, res) => {
    console.log(req.params.id)
    const[r, f] = await connection.query(`select * from songs where album_id = ${req.params.id}`)
    res.json(r);
})

app.get('/artists/:id/album', async (req, res) => {
    const[r, f] = await connection.query(`select * from album where artist_id = ${req.params.id}`)
    res.json(r);
})

app.listen(serverPort, serverIp, () => {
    console.log('Server is running in port 1212');
});
