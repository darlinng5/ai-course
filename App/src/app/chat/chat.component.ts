import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked, OnDestroy, AfterViewInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { ChatServiceService } from '../Services/chat-service.service';
import { TextMessage } from './textMessage';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPrefences } from '../common/prefences';
import { MessageRequest } from './MessageRequest';
import { RecordedBlob } from '../Services/RecordedBlob';
import Typed from 'typed.js';
import { ToastrService } from 'ngx-toastr';

export interface AudioResponse {
  text: string;
  audio: string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  @ViewChild('messageContainer') private messageContainer: ElementRef|null = null;
  messages:TextMessage[] = [];
  recorder:any;
  newMessage = '';
  isRecording = false;
  audio = new Audio();
  isWaitingResponse: boolean = false;
  isSystemSpeaking: boolean = false;
  isLoadding:boolean=false;
  Mistakes:any[]=[];
  Sugestion:any[]=[];
  timeRecorded:string="";
  userPreferences=new UserPrefences();
  message=new TextMessage();
  audioMessage:RecordedBlob=null;
  timeRecordedCounter:number=0;
  isVisible:boolean=true;

  @ViewChild('typedElement') typedElement!: ElementRef;
  typed!: Typed;
  

 /**
  *
  */
 constructor(private router:Router, private toastr: ToastrService,private route: ActivatedRoute,public dialog: MatDialog, private readonly chatService: ChatServiceService ) {
 
  
 }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initTyped();
    }, 0);
  }
  ngOnDestroy(): void {
    this.typed.destroy();
  }
  ngOnInit(): void {
    let id = null;
    this.route.params.subscribe(params => {
       id = params['id'];
    });
    this.toastr.info('Make sure you give permissions to your microphone', 'Info', {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
    });

    this.isWaitingResponse=true;
    this.Mistakes.push("In this panel you are going to see the mistakes that you have made in the conversation");
    this.Sugestion.push("Ok, lets start the conversation, you can write or record a message, I will answer you in a few seconds.");
    this.Sugestion.push("You are able close this panel but you can open it again by refreshig the page")
    this.message.text="";
    this.message.user=true;
    this.message.IsInitialMessage=true;
    this.message.MessageTypeId =id;
    this.message.isTextMessage=false;
    
    if(this.message.IsInitialMessage){
      setTimeout(() => {
      this.Sugestion=[];
      this.Mistakes=[];
      this.Sugestion.push("Please wait the first message from the system...");

        this.sendMessage();
      }, 5000);
    }

  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure do you want to end this call?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/jobinterview/']);
      } else {
      }
    });
  }



    toggleRecording() {
    this.isRecording = !this.isRecording;

    
  }
  pushMessage(){
      this.message.text = this.newMessage;
      this.message.user = true;
      this.message.IsInitialMessage = false;  
      this.message.isTextMessage = true;  
      this.sendMessage();
      this.newMessage = '';
  }
  pushAudioMessage(){

  }
  showSuccess() {
    this.toastr.success('Mensaje de éxito!', 'Título');
  }

  sendMessage(){
    this.isWaitingResponse=true;
    this.isLoadding=true;
    var request = new MessageRequest();
    request.preferences = this.userPreferences;
    request.message = this.message;
    this.chatService.sendMessage(request,this.audioMessage).subscribe({
              next: (response: any) => {
                this.isWaitingResponse = false;  
                this.Mistakes = [];
                this.Sugestion = [];
                if(response.data==null && response.message!=null){
                  this.toastr.error(response.message, 'Error', {
                    timeOut: 5000,
                    progressBar: true,
                    progressAnimation: 'increasing',
                  });
                  return;
                }
                                             
                  this.messages.push({ text: response.data.userMessage.text, user: true, MessageTypeId: this.message.MessageTypeId, IsInitialMessage: false, isTextMessage:true});                 
                  this.messages.push({ text: response.data.botMessage.text, user: false, MessageTypeId: this.message.MessageTypeId, IsInitialMessage: false, isTextMessage:true});     

                if(response.data.botMessage.fileBytes!=null && response.data.botMessage.fileBytes!=undefined){                 
                const audioBlob = this.base64ToBlob(response.data.botMessage.fileBytes, 'audio/wav');
                const url = window.URL.createObjectURL(audioBlob);
                this.audio.src = url;
                this.audio.load();          
                this.audio.addEventListener('play', () => {
                  this.isSystemSpeaking = true;
                });
        
                this.audio.addEventListener('ended', () => {
                  this.isSystemSpeaking = false;
                });

                this.audio.play();
                this.isLoadding=false;
              }
              
              },error: (error) => {
                
                  this.toastr.error(error.message, 'Error', {
                    timeOut: 5000,
                    progressBar: true,
                    progressAnimation: 'increasing',
                  });

              }});
              
  }  

  base64ToBlob(base64: string, mimeType: string): Blob {
    // Verificar la validez de la cadena base64
    if (!base64 || base64.trim() === '') {
      throw new Error('La cadena base64 está vacía o no es válida');
    }

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }


  removeSuggestion(index: number) {
    
    this.Sugestion.splice(index, 1);
  }
  removeError(index: number) {
   
    this.Mistakes.splice(index, 1);
  }

  initTyped() {
    const options = {
      strings: ['This is a free version', 'You are using GPT-3.5 and Whisper by default', 'GPT-4 and more models are available to registered users.'],
      typeSpeed: 100,
      backSpeed: 50,
      autoInsertCss: true,
      loop: false
    };
    this.typed = new Typed(this.typedElement.nativeElement, options);
  }
 
  toggleVisibility(){
    this.isVisible = !this.isVisible;
  }
}
