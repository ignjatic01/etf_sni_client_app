import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PolisaCreated {
  private _polisa: any;

  setPolisa(polisa: any) {
    this._polisa = polisa;
  }

  getPolisa() {
    return this._polisa;
  }
}
