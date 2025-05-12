import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-file-chooser',
  imports: [FormsModule],
  templateUrl: './file-chooser.component.html',
  styleUrl: './file-chooser.component.scss'
})
export class FileChooserComponent {

    fichier?: File;

    @Output()
    selected= new EventEmitter<File | null>();

    onFichierSelectionne(e : any){
      this.fichier = e.target.files[0];
      this.selected.emit(this.fichier);
    }

}
