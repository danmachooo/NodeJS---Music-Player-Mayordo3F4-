const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const audioRoutes = require('./routes/audioRoute')
const albumRoutes = require('./routes/albumRoute')
const playlistRoutes = require('./routes/playlistRoute')
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', audioRoutes);
app.use('/albums', albumRoutes);
app.use('/playlists', playlistRoutes);

app.listen(port, () => {
    console.log(`Connected: Running on http://localhost:${port}`);
});
