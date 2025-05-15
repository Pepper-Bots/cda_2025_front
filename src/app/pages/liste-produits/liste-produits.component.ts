import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table';

/**
 * Composant responsable de l'affichage de la liste des produits.
 * Utilise une table Angular Material pour présenter les données.
 */
@Component({
  selector: 'app-liste-produits',
  imports: [
    MatTable
  ],
  templateUrl: './liste-produits.component.html',
  styleUrl: './liste-produits.component.scss'
})
export class ListeProduitsComponent {

  /**
   * Injection du service HttpClient pour effectuer des requêtes HTTP.
   */
  http = inject(HttpClient);

  /**
   * Tableau contenant la liste des produits récupérés depuis l'API.
   */
  products: Product[] = [];

  /**
   * Colonnes affichées dans le tableau des produits.
   */
  displayedColumns = [
    'nom', 'codeArticle', 'prix', 'description', 'createur'
  ];

  /**
   * Méthode appelée à l'initialisation du composant.
   * Récupère les produits depuis le backend et les assigne au tableau `products`.
   */
  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:8080/products')
      .subscribe(products => this.products = products);
  }
}
