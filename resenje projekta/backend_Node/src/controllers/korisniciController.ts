import * as express from "express"
import korisnik from "../models/korisnik"
import korisnikNaCekanju from "../models/korisnikNaCekanju"
import firma from "../models/firma"
import zakazanoUredjivanjeBaste from "../models/zakazanoUredjivanjeBaste"
import dekoraterPrihvaceniPoslovi from "../models/dekoraterPrihvaceniPoslovi"
import { error } from "console"
import servis from "../models/servis"




export class KorisniciController{

    prijavaNaSistem = async (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme
        let lozinka = req.body.lozinka

        const bcrypt = require('bcrypt');


        try {
          
          const korisnikNaCekanjuData = await korisnikNaCekanju.findOne({ korisnickoIme: korisnickoIme, status: "deaktiviran" });
      
          if (korisnikNaCekanjuData) {
            return res.json(korisnikNaCekanjuData);
          }
      
          
          const korisnikData = await korisnik.findOne({ korisnickoIme: korisnickoIme });
      
          if (korisnikData) {
            
            if (korisnikData.tipKorisnika === "admin") {
              return res.json(null);
            }
      
            
            const match = await bcrypt.compare(lozinka, korisnikData.lozinka);
            
            if (match) {
              return res.json(korisnikData);
            } 
            else {
              return res.json(null);
            }
          } else {
            return res.json(null);
          }
      
        } catch (err) {
          console.log(err);
        }

    }


    registrujNovogVlasnika = async (req: express.Request, res: express.Response) => {

      try {
        
        const { korisnickoIme, lozinka, ime, prezime, pol, adresa, telefon, mejl, kreditnaKartica, tipKorisnika, status } = req.body;
        

        // ovde se proverava medju vec registrovanim korisnicima
        let existingUserByUsername = await korisnik.findOne({ korisnickoIme: korisnickoIme });
        if (existingUserByUsername) {
            return res.json({ "poruka": "korisnicko ime nije jedinstveno" });
        }

        // ovde se proverava medju korisnicima koji su na cekanju
        existingUserByUsername = await korisnikNaCekanju.findOne({ korisnickoIme: korisnickoIme });
        if (existingUserByUsername) {
            return res.json({ "poruka": "korisnicko ime nije jedinstveno" });
        }

        // ovde se proverava medju vec registrovanim korisnicima
        let existingUserByEmail = await korisnik.findOne({ mejl: mejl });
        if (existingUserByEmail) {
            return res.json({ "poruka": "mejl nije jedinstven" });
        }

        existingUserByEmail = await korisnikNaCekanju.findOne({ mejl: mejl });
        if (existingUserByEmail) {
            return res.json({ "poruka": "mejl nije jedinstven" });
        }

        
        const profilnaSlika = req.file ? req.file.buffer : null;

        const bcrypt = require('bcrypt');

        const hashedLozinka = await bcrypt.hash(lozinka, 10); // 10 je salt

        const noviKorisnikNaCekanju = new korisnikNaCekanju({
          korisnickoIme,
          lozinka: hashedLozinka, 
          ime,
          prezime,
          pol,
          adresa,
          telefon,
          mejl,
          kreditnaKartica,
          tipKorisnika,
          profilnaSlika,
          status
      });
    
        await noviKorisnikNaCekanju.save();

        res.json({ "poruka": "ok" });
    } catch (error) {
        console.error(error);
        res.json({ error: "greska" });
    }

      
        
        
  }


  dodajNovogDekoratera =  async (req: express.Request, res: express.Response) => {
    try {
        
      const { korisnickoIme, lozinka, ime, prezime, pol, adresa, telefon, mejl, kreditnaKartica, tipKorisnika } = req.body;
      

      // ovde se proverava medju vec registrovanim korisnicima
      let existingUserByUsername = await korisnik.findOne({ korisnickoIme: korisnickoIme });
      if (existingUserByUsername) {
          return res.json({ "poruka": "korisnicko ime nije jedinstveno" });
      }

      // ovde se proverava medju korisnicima koji su na cekanju
      existingUserByUsername = await korisnikNaCekanju.findOne({ korisnickoIme: korisnickoIme });
      if (existingUserByUsername) {
          return res.json({ "poruka": "korisnicko ime nije jedinstveno" });
      }

      // ovde se proverava medju vec registrovanim korisnicima
      let existingUserByEmail = await korisnik.findOne({ mejl: mejl });
      if (existingUserByEmail) {
          return res.json({ "poruka": "mejl nije jedinstven" });
      }

      existingUserByEmail = await korisnikNaCekanju.findOne({ mejl: mejl });
      if (existingUserByEmail) {
          return res.json({ "poruka": "mejl nije jedinstven" });
      }

      
      const profilnaSlika = req.file ? req.file.buffer : null;

      const bcrypt = require('bcrypt');

      const hashedLozinka = await bcrypt.hash(lozinka, 10); // 10 je salt

      const noviKorisnik = new korisnik({
        korisnickoIme,
        lozinka: hashedLozinka, 
        ime,
        prezime,
        pol,
        adresa,
        telefon,
        mejl,
        kreditnaKartica,
        tipKorisnika,
        profilnaSlika
    });
  
      await noviKorisnik.save();

      res.json({ "poruka": "ok" });
  } catch (error) {
      console.error(error);
      res.json({ error: "greska" });
  }

  }


  dohvatiSveKorisnikeNaCekanju = (req: express.Request, res: express.Response) => {
    korisnikNaCekanju.find({status: "ceka"}).then(
      data => {
        if(data){
          res.json(data)
        }
        else{
          res.json(null)
        }
      }
    ).catch(error => {
      console.log(error)
    })

  }

  promeniLozinku = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme
    let staraLozinka = req.body.staraLozinka
    let novaLozinka = req.body.novaLozinka

    const bcrypt = require('bcrypt');


    korisnik.findOne({korisnickoIme: korisnickoIme}).then(
      data => {
        if(data){

          bcrypt.compare(staraLozinka, data.lozinka).then(
            (lozinkeSePoklapaju: Boolean) => {

              if(lozinkeSePoklapaju){

                bcrypt.hash(novaLozinka, 10).then(
                  (hashedNovaLozinka: any) => {
                    data.lozinka = hashedNovaLozinka

                    data.save().then(
                      () => {
                        res.json({"poruka": "ok"})
                      }
                    ).catch(err => {
                      console.log(err)
                    })
                  }
                )
                
              }
              else{
                res.json({"poruka": "lozinka nije tacna"})
              }
            }
          ).catch((err: any) => {
            console.log(err)
          })

        }
        else{
          res.json({"poruka": "korisnik nije pronadjen"})
        }
      }
    )
  }


  azurirajProfil = (req: express.Request, res: express.Response) => {

    const { korisnickoIme, lozinka, ime, prezime, pol, adresa, telefon, mejl, kreditnaKartica, tipKorisnika } = req.body;
    const profilnaSlika = req.file ? req.file.buffer : null;

    korisnik.findOne({korisnickoIme: korisnickoIme}).then(
      data => {
        if(data){
          data.ime = ime
          data.prezime = prezime
          data.adresa = adresa
          data.telefon = telefon
          data.mejl = mejl
          data.kreditnaKartica = kreditnaKartica
          data.profilnaSlika = profilnaSlika

          data.save().then(
            () => {
              res.json(data)
            }
          ).catch(err => {
            console.log(err)
            res.json(null)
          })

        }
        else{
          res.json(null)
        }
      }
    ).catch(err => {
      console.log(err)
      res.json(null)
    })

  }


  dohvatiSveVlasnike = (req: express.Request, res: express.Response) => {
    korisnik.find({tipKorisnika: "vlasnik"}).then(
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

  dohvatiSveDekoratere = (req: express.Request, res: express.Response) => {
    korisnik.find({tipKorisnika: "dekorater"}).then(
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

  deaktivirajKorisnika = (req: express.Request, res: express.Response) => {
    console.log("usao u deaktivirajKorisnika")
    const korisnickoIme = req.body.korisnickoIme

    korisnik.findOneAndDelete({korisnickoIme: korisnickoIme}).then(
      data => {
        if(data){
          const noviKorisnikNaCekanju = new korisnikNaCekanju(
            {
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
              profilnaSlika: data.profilnaSlika,
              status: "deaktiviran"
            }
          )

          noviKorisnikNaCekanju.save().then(
            () => {
              res.json({"poruka": "ok"})
            }
          ).catch(err => {
            console.log(err)
          })

        }
      }
    )
  }


  dohvatiSlobodneDekoratere = async (req: express.Request, res: express.Response) => {
    try {
      
      const dekorateri = await korisnik.find({tipKorisnika: "dekorater"}).exec()

      const dekorateriIzfirmi = await firma.find({}).select("dekorateri").exec()

      const zaposleniDekorateri = dekorateriIzfirmi
        .flatMap(firma => firma.dekorateri)
        .map(dekorater => dekorater.korisnickoIme)

      const nezaposleniDekorateri = dekorateri.filter(dekorater => {
        return !zaposleniDekorateri.includes(dekorater.korisnickoIme)
      })
      
      res.json(nezaposleniDekorateri)

    } catch (err) {
      console.log(err)
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


  zakaziUredjivanjeBaste = async (req: express.Request, res: express.Response) => {
    
    try {
      const zakazivanje = new zakazanoUredjivanjeBaste(req.body)

      await zakazivanje.save()

      res.json({"poruka": "ok"})

    } catch (error) {
        console.log(error)
        res.json({"poruka": "nije ok"})
    }
    

    

  }


  dohvatiSvaZakazivanjaZaKorisnika = (req: express.Request, res: express.Response) => {
    const korisnickoIme = req.body.korisnickoIme
    zakazanoUredjivanjeBaste.find({korisnickoImeVlasnika: korisnickoIme}).then(
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


  pronadjiNazivFirmeUKojojRadiDekorater = async (req: express.Request, res: express.Response) => {
    try {
      // console.log("usao")
      const korisnickoIme = req.body.korisnickoIme

      const pronadjenaFirma = await firma.findOne({
        dekorateri: {
          $elemMatch: {korisnickoIme: korisnickoIme}
        }
      }, 'naziv')

      if(pronadjenaFirma){
        res.json({"poruka": pronadjenaFirma.naziv}) 
      }
      else{
        res.json(null)
      }

    } catch (error) {
      console.error('Error finding firma:', error);
      res.json(null)
    }
    

    
  }


  dohvatiSvaNeobradjenaZakazivanjaZaFirmu = (req: express.Request, res: express.Response) => {
    let naziv = req.body.naziv

    zakazanoUredjivanjeBaste.find({nazivFirme: naziv, status: "neobradjen"}).then(
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
      res.json(null)
    })

  }


  potvrdiZakazivanje = async (req: express.Request, res: express.Response) => {
    const korisnickoImeDekoratera = req.body.korisnickoImeDekoratera
    const zahtev = req.body.zahtev
    const { _id } = zahtev // Extract the _id from the zahtev

    try {
      
      await zakazanoUredjivanjeBaste.findByIdAndUpdate(_id, { status: 'prihvacen' })
    
      let dekoraterPoslovi = await dekoraterPrihvaceniPoslovi.findOne({ korisnickoImeDekoratera: korisnickoImeDekoratera })

      if (dekoraterPoslovi) {
        dekoraterPoslovi.poslovi.push(zahtev)
        await dekoraterPoslovi.save()
      } else {
        let noviDekoraterPoslovi = new dekoraterPrihvaceniPoslovi({
          korisnickoImeDekoratera: korisnickoImeDekoratera,
          poslovi: [zahtev] 
        });
        await noviDekoraterPoslovi.save()
      }

      
      res.json({ poruka: 'ok' });
    } catch (err) {
      console.error('Error in potvrdiZakazivanje:', err)
    }

  }


  odbijZahtev = async (req: express.Request, res: express.Response) => {
    try {
      const zahtev = req.body
      const { _id } = zahtev

      await zakazanoUredjivanjeBaste.findByIdAndDelete(_id)

      res.json({"poruka": "ok"})
    } catch (err) {
      console.log(err)
    }
  }



  dohvatiPrihvacenePoslove = (req: express.Request, res: express.Response) => {
    const korisnickoIme = req.body.korisnickoIme

    dekoraterPrihvaceniPoslovi.findOne({korisnickoImeDekoratera: korisnickoIme}).then(
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


  zavrsiPosao = async  (req: express.Request, res: express.Response) => {
   
    const { posao, korisnickoImeDekoratera } = req.body;
    const { _id } = posao; 

    try {
      
      await zakazanoUredjivanjeBaste.findByIdAndUpdate(
        _id,
        { status: "zavrsen" }
      )

      
      let dekoraterPoslovi = await dekoraterPrihvaceniPoslovi.findOne({ korisnickoImeDekoratera:korisnickoImeDekoratera })

      if (!dekoraterPoslovi) {
        return res.json({ "poruka": "Dekorater not found" })
      }

      
      const posaoId = posao._id

      await dekoraterPrihvaceniPoslovi.findOneAndUpdate(
        {
          korisnickoImeDekoratera, 
          "poslovi._id": posaoId 
        },
        {
          $set: { 'poslovi.$.status': "zavrsen" } 
        }
      )

      
      return res.json({ "poruka": "ok" })
      
    } catch (err) {
      console.error("Error in zavrsiPosao:", err)
      return res.json({ "poruka": "Error marking posao as zavrsen" })
    }

  }


  dohvatiSveZavrsenePoslove = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme

    zakazanoUredjivanjeBaste.find({korisnickoImeVlasnika: korisnickoIme, status: "zavrsen"}).then(
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


  posaljiZahtevZaServis = async (req: express.Request, res: express.Response) => {
    
    try {
      console.log('Request Body:', req.body);
      const zahtevZaServis = req.body;

      const noviServis = new servis({
        korisnickoImeVlasnika: zahtevZaServis.korisnickoImeVlasnika,
        nazivFirme: zahtevZaServis.nazivFirme,
        kvadratura: zahtevZaServis.kvadratura,
        datumPodnosenjaZahteva: new Date(), 
        datumKrajaServisa: zahtevZaServis.datumKrajaServisa,
        status: zahtevZaServis.status
      });

      
      await noviServis.save(); 
      res.json({"poruka": "ok"})
    } catch (err) {
      console.log(err)
    }
    
  }



  dohvatiSvePosloveNaServisu = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme
    servis.find({ korisnickoImeVlasnika: korisnickoIme, status: "neobradjen"}).then(
      data => {
        res.json(data)
      }
    ).catch(err => {
      console.log(err)
    })
  }


  dohvatiSveZahteveZaServisZaFirmu = (req: express.Request, res: express.Response) => {
    let nazivFirme = req.body.nazivFirme

    servis.find({nazivFirme: nazivFirme, status: "neobradjen"}).then(
      data => {
        if(data){
          res.json(data)
        }
      }
    ).catch(err => {
      console.log(err)
    })
  }


  prihvatiZahtevZaServis = (req: express.Request, res: express.Response) => {
    const { zahtevZaServis, korisnickoImeDekoratera } = req.body;

    // Assuming zahtevZaServis has a unique identifier, like _id
    servis.findByIdAndUpdate(
      zahtevZaServis._id,        
      { status: 'obradjen' }     
      ).then(
        () => {
          res.json({"poruka": "ok"})
        }
      ).catch(err => {
        console.log(err)
      })
  }

  odbijZahtevZaServis = (req: express.Request, res: express.Response) => {
    const { zahtevZaServis, korisnickoImeDekoratera } = req.body;


    servis.findByIdAndUpdate(
      zahtevZaServis._id,        
      { status: 'odbijen' }     
      ).then(
        () => {
          res.json({"poruka": "ok"})
        }
      ).catch(err => {
        console.log(err)
      })

  }


  dohvatiSvePrihvacenePosloveZaSveDekoratere = (req: express.Request, res: express.Response) => {
    dekoraterPrihvaceniPoslovi.find({}).then(
      data => {
        if(data){
          res.json(data)
        }
      }
    )
  }


  dohvatiSveDekorisaneBaste = (req: express.Request, res: express.Response) => {
    zakazanoUredjivanjeBaste.find({status: "zavrsen"}).then(
      data => {
        if(data){
          res.json(data)
        }
        else{
          res.json(null)
        }
      }
    )
  }


  dohvatiSveZakazanePoslove = (req: express.Request, res: express.Response) => {
    zakazanoUredjivanjeBaste.find({}).then(
      data => {
        if(data){
          res.json(data)
        }
        else{
          res.json(null)
        }
      }
    )
  }


}