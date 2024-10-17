import { Basta } from "./basta"

export class ZakazanoUredjivanjeBaste{
    korisnickoImeVlasnika: string = ""
    tipBaste: string = ""
    nazivFirme: string = ""
    izabraneUsluge: string[] = []
    datumRadova: Date = new Date()
    datumZakazivanja: Date = new Date()
    ukupnaKvadratura: number = 1
    opis: string = ""
    basta: Basta = new Basta("")
    status: string = "neobradjen"
    kvadratura: number = 0
}