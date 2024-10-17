import mongoose from "mongoose";


const Schema = mongoose.Schema


let Servis = new Schema(
    {
        korisnickoImeVlasnika: {
            type: String
        },
        nazivFirme: {
            type: String
        },
        kvadratura: {
            type: Number
        },
        datumPodnosenjaZahteva: {
            type: Date
        },
        datumKrajaServisa: {
            type: Date
        },
        status: {
            type: String
        }
    }
)


export default mongoose.model("Servis", Servis, "servis")

