import express from "express";
import { KorisniciController } from "../controllers/korisniciController";
import multer from 'multer'


const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });


const korisniciRouter = express.Router()


korisniciRouter.route("/prijavaNaSistem").post(
    (req, res) => new KorisniciController().prijavaNaSistem(req, res)
)

korisniciRouter.route("/registrujNovogVlasnika").post(
    upload.single('profilnaSlika'), 
    (req, res) => new KorisniciController().registrujNovogVlasnika(req, res)
)

korisniciRouter.route("/dohvatiSveKorisnikeNaCekanju").get(
    upload.single('profilnaSlika'), 
    (req, res) => new KorisniciController().dohvatiSveKorisnikeNaCekanju(req, res)
)

korisniciRouter.route("/promeniLozinku").post(
    upload.single('profilnaSlika'), 
    (req, res) => new KorisniciController().promeniLozinku(req, res)
)


korisniciRouter.route("/azurirajProfil").post(
    upload.single('profilnaSlika'), 
    (req, res) => new KorisniciController().azurirajProfil(req, res)
)

korisniciRouter.route("/dohvatiSveVlasnike").get(
    (req, res) => new KorisniciController().dohvatiSveVlasnike(req, res)
)

korisniciRouter.route("/deaktivirajKorisnika").post(
    (req, res) => new KorisniciController().deaktivirajKorisnika(req, res)
)

korisniciRouter.route("/dodajNovogDekoratera").post(
    upload.single('profilnaSlika'), 
    (req, res) => new KorisniciController().dodajNovogDekoratera(req, res)
)


korisniciRouter.route("/dohvatiSveDekoratere").get(
    (req, res) => new KorisniciController().dohvatiSveDekoratere(req, res)
)

korisniciRouter.route("/dohvatiSlobodneDekoratere").get(
    (req, res) => new KorisniciController().dohvatiSlobodneDekoratere(req, res)
)

korisniciRouter.route("/dohvatiSveFirme").get(
    (req, res) => new KorisniciController().dohvatiSveFirme(req, res)
)

korisniciRouter.route("/zakaziUredjivanjeBaste").post(
    (req, res) => new KorisniciController().zakaziUredjivanjeBaste(req, res)
)

korisniciRouter.route("/dohvatiSvaZakazivanjaZaKorisnika").post(
    (req, res) => new KorisniciController().dohvatiSvaZakazivanjaZaKorisnika(req, res)
)

korisniciRouter.route("/pronadjiNazivFirmeUKojojRadiDekorater").post(
    (req, res) => new KorisniciController().pronadjiNazivFirmeUKojojRadiDekorater(req, res)
)

korisniciRouter.route("/dohvatiSvaNeobradjenaZakazivanjaZaFirmu").post(
    (req, res) => new KorisniciController().dohvatiSvaNeobradjenaZakazivanjaZaFirmu(req, res)
)

korisniciRouter.route("/potvrdiZakazivanje").post(
    (req, res) => new KorisniciController().potvrdiZakazivanje(req, res)
)

korisniciRouter.route("/odbijZahtev").post(
    (req, res) => new KorisniciController().odbijZahtev(req, res)
)

korisniciRouter.route("/dohvatiPrihvacenePoslove").post(
    (req, res) => new KorisniciController().dohvatiPrihvacenePoslove(req, res)
)

korisniciRouter.route("/zavrsiPosao").post(
    (req, res) => new KorisniciController().zavrsiPosao(req, res)
)

korisniciRouter.route("/dohvatiSveZavrsenePoslove").post(
    (req, res) => new KorisniciController().dohvatiSveZavrsenePoslove(req, res)
)

korisniciRouter.route("/posaljiZahtevZaServis").post(
    (req, res) => new KorisniciController().posaljiZahtevZaServis(req, res)
)

korisniciRouter.route("/dohvatiSvePosloveNaServisu").post(
    (req, res) => new KorisniciController().dohvatiSvePosloveNaServisu(req, res)
)

korisniciRouter.route("/dohvatiSveZahteveZaServisZaFirmu").post(
    (req, res) => new KorisniciController().dohvatiSveZahteveZaServisZaFirmu(req, res)
)


korisniciRouter.route("/prihvatiZahtevZaServis").post(
    (req, res) => new KorisniciController().prihvatiZahtevZaServis(req, res)
)

korisniciRouter.route("/odbijZahtevZaServis").post(
    (req, res) => new KorisniciController().odbijZahtevZaServis(req, res)
)


korisniciRouter.route("/dohvatiSvePrihvacenePosloveZaSveDekoratere").get(
    (req, res) => new KorisniciController().dohvatiSvePrihvacenePosloveZaSveDekoratere(req, res)
)


korisniciRouter.route("/dohvatiSveDekorisaneBaste").get(
    (req, res) => new KorisniciController().dohvatiSveDekorisaneBaste(req, res)
)


korisniciRouter.route("/dohvatiSveZakazanePoslove").get(
    (req, res) => new KorisniciController().dohvatiSveZakazanePoslove(req, res)
)



export default korisniciRouter

