export class Korisnik{
    korisnickoIme: string = ""
    lozinka: string = ""
    ime: string = ""
    prezime: string = ""
    pol: 'M' | 'Z' = 'M'
    adresa: string = ""
    telefon: string = ""
    mejl: string = ""
    kreditnaKartica: string = ""
    profilnaSlika: File | null  = null
    tipKorisnika: "vlasnik" | "dekorater" | "admin" = "vlasnik"
    status: "odbijen" | "ceka" | "deaktiviran" = "ceka"
}


