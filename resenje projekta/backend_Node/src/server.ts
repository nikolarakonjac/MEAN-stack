import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import korisniciRouter from './routers/korisniciRouter';
import adminRouter from './routers/adminRouter';




const app = express();

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/PiaProjekat")
const connection = mongoose.connection
connection.once("open", ()=>{
    console.log("db ok")
})

const router = express.Router()
app.use("/", router)

router.use("/korisnici", korisniciRouter)
router.use("/admin", adminRouter)

app.listen(4000, () => console.log(`Express server running on port 4000`));


