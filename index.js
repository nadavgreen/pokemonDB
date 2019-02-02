// Requires

const app = require('express')();
const bodyParser = require('body-parser');
const {townRouter} = require('./routes/town');
const {trainerRouter} = require('./routes/trainer');
const {pokemonRouter} = require('./routes/pokemon');
const port = 3000;

// MiddleWare

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes

app.use('/town', townRouter);
app.use('/trainer', trainerRouter);
app.use('/pokemon', pokemonRouter);

// Server

app.listen(port, ()=>{
	console.log(`Server is listening at Port: ${port}`)
})
