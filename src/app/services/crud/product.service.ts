import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {NotificationService} from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)
  notification = inject(NotificationService)
  readonly products$ = new BehaviorSubject<Product[]>([])

  getAll() {
    this.http.get<Product[]>("http://localhost:8080/products")
      .subscribe(products => this.products$.next(products))
  }

  save(product: any) {
    return this.http.post("http://localhost:8080/product", product).pipe(
      tap(() => this.getAll()),
      catchError(error => {
        // Handle the error if needed
        return throwError(error);
      })
    );
  }

  update(id: number, product: any) {

    return this.http.put("http://localhost:8080/product/" + id, product).pipe(
      tap(() => this.getAll()),
      catchError(error => {
        // Handle the error if needed
        return throwError(error);
      })
    );
  }
}
