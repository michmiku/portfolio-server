const router = require('express').Router();
let Music = require('../models/music.model');
let MusicMetadata = require('../models/musicMetadata.model');
const fs = require('fs')
const path = require('path')
const mm = require('music-metadata');
const util = require('util');


router.route('/').get((req, res) => {
    fs.readdir(__dirname + '/../music', function (err, files) {
        if (err) {
            return console.log(err);
        }
        files.forEach(function (filename, key) {
            mm.parseFile(__dirname + '/../music/' + filename)
                .then(metadata => {
                    let duration = metadata.format.duration
                    let minutes = Math.floor(duration / 60);
                    let seconds = Math.floor(duration - minutes * 60);
                    if (seconds < 10) {
                        seconds = '0' + seconds
                    }
                    if (minutes < 10) {
                        minutes = '0' + minutes
                    }
                    duration = minutes + ':' + seconds
                    MusicMetadata.find({ file: filename })
                        .then(music => {
                            if (music.length === 0) {
                                const newMusicMetadata = new MusicMetadata({ file: filename, title: metadata.common.title, artist: metadata.common.artist, duration: duration, rawDuration: metadata.format.duration });
                                newMusicMetadata.save()
                            }
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => {
                    console.error(err.message);
                });
        });
    });
});
router.route('/getlist').get((req, res) => {
    MusicMetadata.find()
        .then(music => {
            res.json(music)
        })
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/list').get((req, res) => {
    fs.readdir(__dirname + '/../music', function (err, files) {
        files.forEach(function (filename, key) {
            res.write('<a href= \"' + filename + '\">' + filename + '</a><br>');
            res.write("\n\n");
        });
        res.end()
    });
});

router.route('/add').post((req, res) => {
    const username = req.body.authUser.username
    const file = req.body.file
    const title = req.body.title
    const artist = req.body.artist
    const newMusic = new Music({ username, file, title, artist });
    newMusic.save()
        .then(() => res.json('Music added!'))
        .catch(err => {
            console.log(err)
        });

});
router.route('/favorite').post((req, res) => {
    Music.find({ username: req.body.username })
        .then(music => {
            res.json(music)
        })
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/delete').post((req, res) => {
    const username = req.body.authUser.username
    const title = req.body.title
    Music.findOneAndDelete({ username, title })
        .then(() => res.json("User deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/*.ogg').get((req, res) => {
    fs.readFile(__dirname + '/../music' + decodeURI(req.url), function (err, data) {
        if (!err) {
            res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
    })
});
module.exports = router;