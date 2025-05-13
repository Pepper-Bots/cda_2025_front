import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-liste-produit',
  imports: [MatTableModule],
  templateUrl: './liste-produit.component.html',
  styleUrl: './liste-produit.component.scss'
})
export class ListeProductComponent implements OnInit {

  http = inject(HttpClient)

  products: Product[] = [];
  displayedColumns = [
    "nom", "code", "prix", "description", "createur"]

  ngOnInit() {
    this.http
      .get<Product[]>("http://localhost:8080/products")
      .subscribe(products =>
        this.products = products)
  }

}
