import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../services/notification.service';
import {FileChooserComponent} from '../../components/file-chooser/file-chooser.component';
import {ProductService} from '../../services/crud/product.service';

// TODO Fichier à corriger voir dépot Franck

// ReactiveFormsModule utilisé pour valider le formulaire
// FormsModule bloque le formulaire pour ne pas recharger la page
@Component({
  selector: 'app-edit-product',
  imports: [MatInputModule, MatButtonModule, MatIconModule,
    MatSelectModule, ReactiveFormsModule, FormsModule, MatSelect, MatOption, FileChooserComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  notification = inject(NotificationService);
  router = inject(Router);
  produitService = inject(ProductService);
  photo: File | null = null;

  formulaire = this.formBuilder.group({
    nom: ['Nouveau produit', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    codeArticle: ['777', [Validators.required]],
    description: ['Une description', []],
    prix: [0.10, [Validators.required, Validators.min(0.1)]],
    etat: [{id: 1}],
    etiquettes: [[] as Etiquette[]],
  })

  etats: Etat[] = []
  etiquettes: Etiquette[] = [];
  productEdite: Product | null = null;
  // notification = inject(MatSnackBar);


  ngOnInit() {

    this.activatedRoute.params
      .subscribe(parametres => {

        // Si c'est une édition
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

  // @ts-ignore
  onAjoutProduct(){

    if (this.formulaire.valid) {
      // console.log(this.formulaire.value);

      // Pour éditer produit
      if (this.productEdite) {
        this.produitService
          .update(this.productEdite.id, this.formulaire.value) // TODO chercher différence méthode post & put -> laquelle mieux ici ?
          .subscribe({
            next: () => this.notification.show("Le produit a bien été ajouté", "valid"),
            error: () => this.notification.show("Problème de communication", "error"),
          })
      } else {

        const formData = new FormData();

        formData.set('product', new Blob([JSON.stringify(this.formulaire.value)], {type: 'application/json'}));

        if (this.photo) {
          formData.set('photo', this.photo);
        }


        return this.http
          .post('http://localhost:8080/product', formData)
          .subscribe(resultat => {
            this.notification.show("Le produit a bien été ajouté", "valid")
          })
      }
    }

  };

  compareId(o1: {id: number}, o2: {id: number}) {
    return o1.id === o2.id;
  }

  onPhotoSelectionne(fichier: File | null) {
    // console.log(fichier);
    this.photo = fichier;
  }

}
