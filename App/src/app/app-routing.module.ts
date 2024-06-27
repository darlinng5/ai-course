import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { JobinterviewComponent } from './jobinterview/jobinterview.component';




const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: 'jobinterview', component: JobinterviewComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
