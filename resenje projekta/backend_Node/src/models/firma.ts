import mongoose from "mongoose";


const Schema = mongoose.Schema


let Firma = new Schema(
    {
        naziv: {
            type: String
        },
        adresa: {
            type: String
        },
        usluge: {
            type: Array
        },
        kontaktOsobaIme: {
            type: String
        },
        kontaktOsobaPrezime: {
            type: String
        },
        kontaktOsobaTelefon: {
            type: String
        },
        pocetakGodisnjeg: {
            type: Date
        },
        krajGodisnjeg: {
            type: Date
        },
        dekorateri: {
            type: Array
        }
    }
)


export default mongoose.model("Firma", Firma, "firme")

