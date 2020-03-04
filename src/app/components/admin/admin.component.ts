import { Component } from '@angular/core';
import { Candidate } from 'src/app/interfaces/interfaces';
import { VotesService } from 'src/app/services/votes.service';

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
  public readonly candidates: Candidate[];

  /**
   * Creates an instance of admin component.
   */
  constructor(votesService: VotesService) {
    this.candidates = votesService.getCandidates();
  }
}
