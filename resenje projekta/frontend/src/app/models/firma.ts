import { Korisnik } from "./korisnik"
import { Usluga } from "./usluga"

export class Firma{
    naziv: string = ""
    adresa: string = ""
    kontaktOsobaIme: string = ""
    kontaktOsobaPrezime: string = ""
    kontaktOsobaTelefon: string = ""
    usluge: Array<Usluga> = []
    pocetakGodisnjeg: Date = new Date()
    krajGodisnjeg: Date = new Date()
    dekorateri: Array<Korisnik> = []
}