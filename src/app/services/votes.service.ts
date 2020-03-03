import { Injectable } from '@angular/core';
import { Candidate, CandidateWhite } from '../interfaces/interfaces';

function hashCode(s) {
  return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

const KEY_JSON = hashCode('app-elections');

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  /**
   * Candidates  of votes service
   */
  private candidates: Candidate[];

  constructor() {
    this.candidates = [];
  }

  /**
   * Gets candidates
   * @returns candidates 
   */
  public getCandidates(): Candidate[] {

    const data = localStorage.getItem(KEY_JSON);
    if (data)
      this.candidates = JSON.parse(data);
    else
      this.candidates = [
        CandidateWhite,
        {
          id: 1,
          names: 'Candidato 1',
          votes: 0
        }, {
          id: 2,
          names: 'Candidato 2',
          votes: 0
        }
      ];

    return this.candidates;
  }

  /**
   * Adds vote
   * @param candidate 
   */
  addVote(candidate: Candidate) {
    const index = this.candidates.findIndex(c => c.id == candidate.id);
    if (index >= 0)
      this.candidates[index].votes++;
    localStorage.setItem(KEY_JSON, JSON.stringify(this.candidates))
  }
}
