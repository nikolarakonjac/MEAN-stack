import mongoose from "mongoose";


const Schema = mongoose.Schema


let Korisnik = new Schema(
    {
        korisnickoIme: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        pol: {
            type: String,
            enum: ['M', 'Z']
        },
        adresa: {
            type: String
        },
        telefon: {
            type: String
        },
        mejl: {
            type: String
        },
        kreditnaKartica: {
            type: String
        },
        tipKorisnika: {
            type: String,
            enum: ["vlasnik", "dekorater", "admin"]
        },
        profilnaSlika: {
            type: Buffer
        }
    }
)


export default mongoose.model("Korisnik", Korisnik, "korisnici")

