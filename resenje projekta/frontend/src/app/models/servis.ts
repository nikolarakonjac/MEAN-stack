import { ZakazanoUredjivanjeBaste } from "./zakazanoUredjivanjeBaste";

export class Servis{
    korisnickoImeVlasnika: string = ""
    nazivFirme: string = ""
    kvadratura: number = 1
    datumPodnosenjaZahteva: Date = new Date()
    datumKrajaServisa: Date = new Date()
    status: string = "neobradjen"
}