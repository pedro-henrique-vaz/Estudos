import express from 'express';
import mysql, {QueryError} from "mysql2/promise";
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

function getCurrentIndex(index, songs) {
    return songs[index];
}

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something broke!')
})

app.use(express.static('public'));

app.use((req, res, next) => {
    req.app.locals.user_id = 1
    next()
})

app.get('/song', (req, res) => {
    let player = req.app.locals.player

    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/play/album/:album_id/song/:song_id', async (req, res) => {
    const[r, f] = await connection.query(`select songs.id, songs.name, songs.artist_name, songs.song_link, album.album_cover from songs inner join album on songs.album_id = album.id where album_id = ${req.params.album_id};`)
    const index = r.findIndex(song => song.id == req.params.song_id)
    if (index === -1) {
        res.status(404)
        res.json("não existe musica ou album")
        return
    }
    let player = playersStatus.find(el => el.user_id === req.app.locals.user_id);
    if (!player) {
        player = {user_id: req.app.locals.user_id, index: index, songs: r, originalSongs: [...r]};
        playersStatus.push(player)
    }
    console.log(player)
    res.json(getCurrentIndex(index, r));
})

app.get('/next-song', (req, res) => {
    let player = playersStatus.find(el => el.user_id === req.app.locals.user_id)
    if (!player) {
        res.status(404)
        res.json("não existe player")
        return
    }
    if (player.index === player.songs.length - 1) {
        player.index = 0;
    } else {
        player.index += 1
    }
    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/previous-song', (req, res) => {
    let player = playersStatus.find(el => el.user_id === req.app.locals.user_id)
    if (!player) {
        res.status(404)
        res.json("não existe player")
        return
    }
    if(player.index === 0){
        player.index = player.songs.length - 1;
    }
    else {
        player.index -= 1;
    }
    res.json(getCurrentIndex(player.index, player.songs));
})

app.get('/shuffle', (req, res) => {
    let player = playersStatus.find(el => el.user_id === req.app.locals.user_id)
    if (!player) {
        res.status(404)
        res.json("não existe player")
        return
    }
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
    let player = playersStatus.find(el => el.user_id === req.app.locals.user_id)
    if (!player) {
        res.status(404)
        res.json("não existe player")
        return
    }
    player.songs = [...player.originalSongs]
    res.json()
})

app.post('/like/:id', async (req, res) => {
    let userId = req.app.locals.user_id
    const songId = req.params.id
    const [r, f] = await connection.query(`select * from spotity.like where user_id = ${userId} and song_id = ${songId};`)
    if (!r || r.length === 0) {
        try {
            await connection.query(`insert into spotity.like (likes, user_id, song_id) values (1, ${userId}, ${songId});`)
            res.json(true)
            return
        } catch (err: QueryError) {
            if(err.errno == 1452){
                res.status(404)
                res.json("nao existe")
                return
            }
            throw err
        }
    }
    const song = r[0];
    song.likes = !song.likes;
    await connection.query(`update spotity.like set likes = ${song.likes} where user_id = ${userId} and song_id = ${songId};`)
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
