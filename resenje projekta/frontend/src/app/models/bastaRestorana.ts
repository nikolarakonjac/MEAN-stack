import { Basta } from "./basta";

export class BastaRestorana extends Basta {
    kvadraturaPodFontanom: number = 0
    kvadraturaPodZelenilom: number = 0
    brojStolova: number = 0
    brojStolica: number = 0

    constructor(kvadraturaPodFontanom: number, kvadraturaPodZelenilom: number, brojStolova: number, brojStolica: number) {
        super("bastaRestorana");  
        this.kvadraturaPodFontanom = kvadraturaPodFontanom;
        this.kvadraturaPodZelenilom = kvadraturaPodZelenilom;
        this.brojStolova = brojStolova;
        this.brojStolica = brojStolica;
    }

}