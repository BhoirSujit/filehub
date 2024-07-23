import express from "express";
import fileRoutes from './routes/fileRoutes'
import dotenv from "dotenv";
import connectDB from "./connections/mongodb";
import cors from 'cors';

const app = express();
//dot env configuration
dotenv.config({ path: __dirname+'/.env' });

//constants
const PORT : any  = process.env.PORT;
const DB_CON: string | any = process.env.DB_CON;


//mongodb
connectDB(DB_CON);


//middlewares
app.use(cors({origin: '*', methods: ['GET', 'POST']}));
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));


//router
app.use('/api/file', fileRoutes)


//listen
app.listen(PORT | 3050, ()=> {
    console.log('http://localhost:3050');
})