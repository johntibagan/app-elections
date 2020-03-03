import { Component } from '@angular/core';
import { VotesService } from 'src/app/services/votes.service';
import { Candidate } from 'src/app/interfaces/interfaces';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  /**
   * Candidates  of vote component
   */
  public readonly candidates: Candidate[];

  /**
   * Vote  of vote component
   */
  public vote: boolean;

  constructor(
    private votesService: VotesService,
    private dialog: MatDialog
  ) {
    this.candidates = votesService.getCandidates();
    this.vote = true;
  }

  /**
   * Adds vote
   * @param candidate 
   */
  addVote(candidate: Candidate) {
    const dialog = this.dialog.open(DialogComponent, { data: { candidate, template: 'vote' }, });
    const subs = dialog.afterClosed().subscribe(confirm => {

      subs.unsubscribe();
      if (!confirm) return;

      this.votesService.addVote(candidate);
      this.vote = false;
      setTimeout(() => this.vote = true, 5000);
    });
  }
}
