import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {Etat} from '../../models/etat';

// ReactiveFormsModule utilisé pour valider le formulaire
// FormsModule bloque le formulaire pour ne pas recharger la

/**
 * Composant responsable de la création et de l'édition d'un produit.
 * Utilise Reactive Forms pour gérer la saisie utilisateur et Angular Material pour l'interface.
 */
@Component({
  selector: 'app-edit-product',
  imports: [
    MatInputModule, MatButtonModule, MatIconModule,
    MatSelectModule, ReactiveFormsModule, FormsModule, MatSelect, MatOption
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  /**
   * Constructeur du formulaire réactif.
   */
  formBuilder = inject(FormBuilder);

  /**
   * Service HTTP pour communiquer avec l'API.
   */
  http = inject(HttpClient);

  /**
   * Service Angular permettant d'accéder aux paramètres de la route.
   */
  activatedRoute = inject(ActivatedRoute);

  /**
   * Service personnalisé pour afficher des notifications.
   */
  notification = inject(NotificationService);

  /**
   * Formulaire réactif pour la saisie ou modification d’un produit.
   */
  formulaire = this.formBuilder.group({
    nom: ['Nouveau produit', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    codeArticle: ['777', [Validators.required]],
    description: ['Une description', []],
    prix: [0.10, [Validators.required, Validators.min(0.1)]],
    etat: [{id: 1}],
    etiquettes: [[] as Etiquette[]],
  });

  /**
   * Liste des états possibles à sélectionner dans le formulaire.
   */
  etats: Etat[] = []

  /**
   * Liste des étiquettes disponibles.
   */
  etiquettes: Etiquette[] = [];

  /**
   * Produit actuellement en cours d'édition. Null en cas de création.
   */
  productEdite: Product | null = null;
  // notification = inject(MatSnackBar);

  /**
   * Méthode appelée à l'initialisation du composant.
   * - Charge les paramètres de route (édition ou création),
   * - Récupère la liste des états et étiquettes disponibles.
   */
  ngOnInit() {

    this.activatedRoute.params
      .subscribe(parametres => {

        // Mode édition : chargement du produit existant
        if (parametres['id']) {
          this.http
            .get<Product>('http://localhost:8080/product/' + parametres['id'])
            .subscribe(product => {
              this.formulaire.patchValue(product)
              this.productEdite = product;
            })
        }
      })

    this.http
      .get<Etat[]>(`http://localhost:8080/etats`)
      .subscribe(etats => this.etats = etats)

    this.http
      .get<Etiquette[]>(`http://localhost:8080/etiquettes`)
      .subscribe(etiquettes => this.etiquettes = etiquettes)

  }

  /**
   * Soumet le formulaire pour ajouter ou modifier un produit.
   * Affiche une notification selon le succès de l’opération.
   */
  onAjoutProduct() {

    if (this.formulaire.valid) {
      // console.log(this.formulaire.value);

      // Édition d’un produit existant
      if (this.productEdite) {
        this.http
          .put('http://localhost:8080/product' + this.productEdite.id, this.formulaire.value)
          .subscribe(resultat => {
            this.notification.show("Le produit a bien été modifié", "valid")
          });

      } else {

        this.http
          // Création d’un nouveau produit
          .post('http://localhost:8080/product', this.formulaire.value)
          .subscribe(resultat => {
            this.notification.show("Le produit a bien été ajouté", "valid")
          });
      }
    }

  }

  /**
   * Compare deux objets par leur propriété `id`.
   * Utilisé dans les listes déroulantes pour la sélection correcte.
   *
   * @param o1 Premier objet à comparer
   * @param o2 Deuxième objet à comparer
   * @returns true si les IDs sont identiques
   */
  compareId(o1: {id: number}, o2: {id: number}) {
    return o1.id === o2.id;
  }

}
