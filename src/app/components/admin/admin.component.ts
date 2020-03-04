import { Component } from '@angular/core';
import { Candidate } from 'src/app/interfaces/interfaces';
import { VotesService } from 'src/app/services/votes.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  /**
   * Displayed columns of admin component
   */
  public readonly displayedColumns = ['img', 'id', 'names', 'votes'];

  /**
   * Candidates  of admin component
   */
  public candidates: Candidate[];

  /**
   * Total votes of admin component
   */
  public totalVotes: number;

  /**
   * Creates an instance of admin component.
   */
  constructor(
    private votesService: VotesService,
    private dialog: MatDialog
  ) {
    this.getCandidates();
  }

  /**
   * Gets candidates
   */
  private getCandidates() {
    this.totalVotes = 0;
    this.candidates = this.votesService.getCandidates();
    this.candidates.map(c => this.totalVotes += c.votes);
  }

  /**
   * Resets admin component
   */
  public reset() {
    const dialog = this.dialog.open(DialogComponent, { data: { template: 'reset' }, });
    const subs = dialog.afterClosed().subscribe(confirm => {

      subs.unsubscribe();
      if (!confirm) return;

      this.votesService.reset();
      this.getCandidates();
    });
  }
}
