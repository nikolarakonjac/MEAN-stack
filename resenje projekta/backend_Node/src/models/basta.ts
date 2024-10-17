import { Schema } from "mongoose";

export const BastaSchema = new Schema({
    tip: {
      type: String,
      required: true
    },
    kvadraturaPodBazenom: Number,
    kvadraturaPodZelenilom: Number,
    kvadraturaPodLezaljkamaIStolovima: Number,
    kvadraturaPodFontanom: Number,
    brojStolova: Number,
    brojStolica: Number
  });

