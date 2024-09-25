
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Payment/api/payment';

  // Método para crear la preferencia de pago
  createPreference(product: any): Observable<any> {
    console.log(product)
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, product);
  }
}
