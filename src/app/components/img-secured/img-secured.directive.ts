import {Directive, ElementRef, inject, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Directive({
  selector: '[ImgSecured]',
})
export class ImgSecuredDirective implements OnInit {
  @Input() src: string = '';
  el = inject(ElementRef)
  http = inject(HttpClient)

  ngOnInit() {
    this.http.get(this.src, {responseType: "blob"}).subscribe(data => {
      this.el.nativeElement.src = URL.createObjectURL(data);
    });
  }
}
