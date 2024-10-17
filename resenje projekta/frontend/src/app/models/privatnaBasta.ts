import { Basta } from "./basta"

export class PrivatnaBasta extends Basta{
    kvadraturaPodBazenom: number = 0
    kvadraturaPodZelenilom: number = 0
    kvadraturaPodLezaljkamaIStolovima: number = 0

    constructor(kvadraturaPodBazenom: number, kvadraturaPodZelenilom: number, kvadraturaPodLezaljkamaIStolovima: number) {
        super("privatnaBasta");  
        this.kvadraturaPodBazenom = kvadraturaPodBazenom;
        this.kvadraturaPodZelenilom = kvadraturaPodZelenilom;
        this.kvadraturaPodLezaljkamaIStolovima = kvadraturaPodLezaljkamaIStolovima;
    }

}