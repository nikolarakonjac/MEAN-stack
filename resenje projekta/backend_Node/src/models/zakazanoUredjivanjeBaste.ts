import mongoose from "mongoose";
import { BastaSchema } from "./basta";


const Schema = mongoose.Schema


let ZakazanoUredjivanjeBaste = new Schema(
    {
        korisnickoImeVlasnika: {
            type: String
        },
        tipBaste: {
            type: String
        },
        nazivFirme: {
            type: String
        },
        izabraneUsluge: {
            type: Array<String>
        },
        datumRadova: {
            type: Date
        },
        datumZakazivanja : {
            type: Date
        },
        ukupnaKvadratura: {
            type: Number
        },
        opis: {
            type: String
        },
        basta: {
            type: BastaSchema
        },
        status: {
            type: String
        }
    }
)


export default mongoose.model("ZakazanoUredjivanjeBaste", ZakazanoUredjivanjeBaste, "zakazanaUredjivanjaBaste")

