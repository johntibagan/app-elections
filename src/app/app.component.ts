import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { VotesService } from './services/votes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Login ok of app component
   */
  public loginOk: boolean;

  /**
   * Admin  of app component
   */
  public admin: boolean;

  /**
   * Form  of app component
   */
  public form: FormGroup;

  /**
   * Creates an instance of app component.
   */
  constructor(
    private votesService: VotesService,
    private snackBar: MatSnackBar
  ) {
    this.loginOk = false;
  }

  /**
 * on init
 */
  ngOnInit() {
    this.form = new FormGroup({
      pwd: new FormControl(null, Validators.required)
    });
  }

  /**
   * Logins app component
   */
  public login() {
    const config = this.votesService.getConfig();
    if (config.pwd === this.form.value.pwd)
      this.loginOk = true;
    else
      this.snackBar.open('Contraseña Incorrecta', 'Cerrar');
  }

  /**
   * Backs app component
   */
  back() {
    this.admin = undefined;
  }

  /**
   * Closes app component
   */
  close() {
    this.loginOk = false;
    this.form.reset();
    this.back();
  }
}
