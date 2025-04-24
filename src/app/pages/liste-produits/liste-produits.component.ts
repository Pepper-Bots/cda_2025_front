import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-liste-produits',
  imports: [
    MatTable
  ],
  templateUrl: './liste-produits.component.html',
  styleUrl: './liste-produits.component.scss'
})
export class ListeProduitsComponent {

  http = inject(HttpClient);

  products: Product[] = [];
  displayedColumns= [
    "nom", "codeArticle", "prix", "description", "createur"];

  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:8080/products')
      .subscribe(products => this.products = products)
  }
}
