import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChatServiceService } from '../Services/chat-service.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';


interface Topics {
  id: string;
  topic: string;
}

@Component({
  selector: 'app-jobinterview',
  templateUrl: './jobinterview.component.html',
  styleUrls: ['./jobinterview.component.css']
})
export class JobinterviewComponent implements OnInit {
  formulario: FormGroup;
  id: string = "";
  topics: Topics[] = [];
  filteredTopics: Observable<Topics[]>;
  selectedTopic: Topics;
  topicCtrl = new FormControl();
  isLoading: boolean = false;

  
  constructor(private _chatService:ChatServiceService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

  
    this.GetTopics();
  }

  startPractice() {
    
    if(this.selectedTopic==undefined) {
      this.toastr.error("Please enter a topic to start the practice");
      return;
    }
    this.router.navigate(['/chat/', this.selectedTopic?.id]);
  }

  onTopicChange(topic: Topics) {
    this.selectedTopic = topic;
    this.topicCtrl.setValue(topic.topic);
  }

  private filterTopics(value: string | Topics): Topics[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.topic.toLowerCase();
    return this.topics.filter(topic => topic.topic.toLowerCase().includes(filterValue));
  }
  
  private GetTopics() {
    this.isLoading = true;
    this._chatService.getTopics().subscribe((data:any) => {
      this.isLoading = false;
      this.topics = data.data;
      this.filteredTopics = this.topicCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterTopics(value || ''))
        );
      }, error => {      
        this.isLoading = false ;          
          this.toastr.error(error.message, 'Error', {
            timeOut: 5000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
      });    
    }
}
