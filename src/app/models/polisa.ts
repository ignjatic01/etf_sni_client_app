import { TipOsiguranja } from "./tip-osiguranja";

export interface Polisa {
    tipOsiguranja: TipOsiguranja;
    iznosOsiguranja: number;
    trajanje: number;
    iznosPremije: number;
}