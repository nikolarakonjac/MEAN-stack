import * as express from "express"
import korisnik from "../models/korisnik"
import korisnikNaCekanju from "../models/korisnikNaCekanju"
import firma from "../models/firma"
import { rmSync } from "fs"




export class AdminController{

    login = (req: express.Request, res: express.Response)=>{

        let korisnickoIme = req.body.korisnickoIme
        let lozinka = req.body.lozinka

        korisnik.findOne({korisnickoIme: korisnickoIme, lozinka: lozinka, tipKorisnika: "admin"}).then(
          data => {
            if(data){
                res.json(data)
            }
            else{
              res.json(null)
            }
          }
        ).catch(err=>{
            console.log(err)
        })
        
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
      let korisnickoIme = req.body.korisnickoIme

      korisnikNaCekanju.findOne({korisnickoIme: korisnickoIme}).then(
        data => {
          if(data){

            const newKorisnik = new korisnik({
              korisnickoIme: data.korisnickoIme,
              lozinka: data.lozinka,
              ime: data.ime,
              prezime: data.prezime,
              pol: data.pol,
              adresa: data.adresa,
              telefon: data.telefon,
              mejl: data.mejl,
              kreditnaKartica: data.kreditnaKartica,
              tipKorisnika: data.tipKorisnika,
              profilnaSlika: data.profilnaSlika
            });

            newKorisnik.save().then(
              () => {
                korisnikNaCekanju.deleteOne({korisnickoIme: korisnickoIme}).then(
                  () => {
                    res.json({"poruka": "ok"})
                  }
                ).catch(err => {
                  res.json({"poruka": "problem kod brisanja"})
                  console.log(err)
                })
              }
            ).catch(err => {
              res.json({"poruka": "problem kod dodavanja korisnika"})
              console.log(err)
            })

          }
        }
      )

    }

    odbijZahtev = (req: express.Request, res: express.Response) => {
      let korisnickoIme = req.body.korisnickoIme

      korisnikNaCekanju.findOneAndUpdate({korisnickoIme: korisnickoIme}, {$set: {status: "odbijen"}}).then(
        () => {
          res.json({"poruka": "ok"})
        }
      ).catch(err => {
        console.log(err)
        res.json({"poruka": "greska pri odbijanju, odbijen zahtev"})
      })

    }


    dodajFirmu = async (req: express.Request, res: express.Response) => {
      console.log("usao u dodajFirmu")
      try {
          const firmaData = req.body
          const novaFirma = new firma(firmaData)
          await novaFirma.save()
          res.json({"poruka": "ok"})
      } catch (error) {
        console.log(error)
        res.json({"poruka": "nije ok"})
      }
    }


    dohvatiSveFirme = (req: express.Request, res: express.Response) => {
      firma.find({}).then(
        data => {
          if(data){
            res.json(data)
          }
          else{
            res.json(null)
          }
        }
      ).catch(err => {
        console.log(err)
      })
    }

}