import { TipOsiguranja } from "./tip-osiguranja";

export interface PolisaDto {
    tipOsiguranja: TipOsiguranja;
    iznosOsiguranja: number;
    trajanje: number;
}