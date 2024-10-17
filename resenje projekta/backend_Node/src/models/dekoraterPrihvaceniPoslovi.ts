import mongoose from "mongoose";
import { BastaSchema } from "./basta";


const Schema = mongoose.Schema


let DekoraterPrihvaceniPoslovi = new Schema(
    {
        korisnickoImeDekoratera: {
            type: String
        },
        poslovi: {
            type: Array
        }
    }
)


export default mongoose.model("DekoraterPrihvaceniPoslovi", DekoraterPrihvaceniPoslovi, "dekoraterPrihvaceniPoslovi")

