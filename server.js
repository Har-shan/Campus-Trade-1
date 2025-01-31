import express from 'express'; //module to make requests
import apiRouter from './Router/apiRouter.js'
import bodyParser from 'body-parser'; //module to read the body of post request
import mongoose from 'mongoose';
const app = express(); //function to handle requests , app is an object to handle requests
import { dirname } from 'path'; //function to get directory name
import { getUserPage } from './controllers/getUserPage.js';
import { fileURLToPath } from 'url';
import { getDevsPage } from './controllers/getDevsPage.js';
const __dirname = dirname(fileURLToPath(
    import.meta.url)); //saving the directory name

app.use(bodyParser.urlencoded({ extended: false })); //decoding the data in body
app.use(bodyParser.json()) //for post requests //decoding the data in body
app.set('view engine', 'ejs'); //setting tmplating engine
app.set('views', __dirname + '/views'); //setting  the folder to look for .ejs files
app.use(express.static('./views')); //making views folder public


app.use('/api', apiRouter) // calling /api calls different from different file

app.get('/', (req, res) => {
    res.render("index", { user: undefined }) //rendering the first request
})
app.get('/user/home/:userId', getUserPage)

app.get('/devs/:userId', getDevsPage)

app.get('/devs', (req, res) => {
    res.render('devs', { user: undefined })
})

app.get('/login', (req, res) => {
    res.render('login', { user: undefined })
})

app.get('/register', (req, res) => {
    res.render('register', { user: undefined })
})



const PORT = 3000
mongoose.connect('mongodb+srv://Aarav-Nigam:XtwpTt4aolWGmkzn@cluster0.kd8i4tz.mongodb.net/CampusTradeDB?retryWrites=true&w=majority',  {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     family: 4,
 })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`)
        })
    })
    .catch((err) => { console.log(`${err} !!! Can't Connect !!!`) })