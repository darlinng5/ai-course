import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Lesson {
  id:string;
  day: string;
  name: string;
  color: string;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})

export class CardsComponent {
  @Input() lesson!: Lesson;

  constructor(private toastr: ToastrService,private router:Router) { 

  }

  

  startLesson(event:any){

      if(!event.isActive){
        
        this.toastr.warning('This lesson is not available yet.');
    }else{
      this.router.navigate(['/chat/', event.id]);
    }
    
  }

}
