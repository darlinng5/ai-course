import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Lesson {
  Day: string;
  name: string;
  color: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {


  

  //isVisible = true;

  @Output() visibilityChange = new EventEmitter<boolean>();
  @Input() Mistakes: any[] = [];
  @Input() Sugestion: any[] = [];

  isVisible: boolean=true;

  closeBanner() {
    this.isVisible = false;
    this.visibilityChange.emit(this.isVisible);
  }
  removeSuggestion(index: number) {
    
    this.Sugestion.splice(index, 1);
  }

  removeError(index: number) {
   
    this.Mistakes.splice(index, 1);
  }
 
}
