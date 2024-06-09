import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import {fleetRouter} from "./routes/fleetRouter.js"
import {authRouter} from "./routes/authRouter.js"
import {reserveRouter} from "./routes/reserveRouter.js";
import multer from "multer";


const app = express();
// Cors connection set up
app.options('*', cors(['http://localhost:4200','http://localhost:46500']));
app.use(cors(['http://localhost:4200','http://localhost:46500','http://localhost:8888/uploads']));


//Cors connection set up  
app.use(bodyParser.json());

const port = 8888;
// JSON Configurations - Body Parser & URRL Encoding
app.use(express.json({limit:'1000kb'}));
app.use(express.urlencoded({extended: true, limit:'1000kb'}));
 
if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(fileUpload({limits:{fileSize: 100 * 1024 * 1024},
abortOnLimit:true,
})
);


// ROUTES
app.use('/api/v1/auth', authRouter); 
app.use('/api/v1/book', reserveRouter);
app.use('/api/v1/Rental', fleetRouter);


// PORT
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}...`))
