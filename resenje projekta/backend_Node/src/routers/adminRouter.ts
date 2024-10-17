import express from "express";
import { AdminController } from "../controllers/adminController";





const adminRouter = express.Router()


adminRouter.route("/login").post(
    (req, res) => new AdminController().login(req, res)
)


adminRouter.route("/prihvatiZahtev").post(
    (req, res) => new AdminController().prihvatiZahtev(req, res)
)


adminRouter.route("/odbijZahtev").post(
    (req, res) => new AdminController().odbijZahtev(req, res)
)

adminRouter.route("/dodajFirmu").post(
    (req, res) => new AdminController().dodajFirmu(req, res)
)

adminRouter.route("/dohvatiSveFirme").get(
    (req, res) => new AdminController().dohvatiSveFirme(req, res)
)


export default adminRouter

