import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VoteComponent } from './components/vote/vote.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as M from '@angular/material';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VotesService } from './services/votes.service';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    HomeComponent,
    DialogComponent,
    AdminComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // mat
    M.MatCardModule,
    M.MatToolbarModule,
    M.MatDialogModule,
    M.MatButtonModule,
    M.MatTableModule,
    M.MatSnackBarModule,
    M.MatIconModule,
    M.MatInputModule,
    M.MatFormFieldModule,
    M.MatTooltipModule
  ],
  providers: [VotesService, M.MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
