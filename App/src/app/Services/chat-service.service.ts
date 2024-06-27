import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment-dev';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AudioResponse } from '../chat/chat.component';
import { Observable } from 'rxjs';
import { UserPrefences } from '../common/prefences';
import { TextMessage } from '../chat/textMessage';
import { MessageRequest } from '../chat/MessageRequest';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }



  sendMessage(request:MessageRequest,blob:any){
    const formData = new FormData();
    if(blob){
      formData.append('audioStream', blob.blob, blob.title);
    }
    formData.append('messageRequest',JSON.stringify(request));
    return this.http.post(`${baseUrl}/api/Chat/init`,formData);
}
   getTopics(){
    return this.http.get(`${baseUrl}/api/Chat/GetTopics`);
   }

}