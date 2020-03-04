import { Injectable } from '@angular/core';
import { Candidate, CandidateWhite, ConfigApp } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

function hashCode(s) {
  return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

export const KEY_JSON = hashCode('app-elections');
const KEY_CONFIG = hashCode('app-config');

@Injectable()
export class VotesService {

  /**
   * Determines whether vote in
   */
  public inVote: boolean;

  /**
   * Candidates  of votes service
   */
  private candidates: Candidate[];

  constructor() {
    this.candidates = [];
  }

  /**
   * Resets votes service
   */
  public reset() {
    localStorage.removeItem(KEY_JSON);
    localStorage.removeItem(KEY_CONFIG);
    CandidateWhite.votes = 0;
    this.candidates = [];
  }

  /**
   * Gets config
   */
  public getConfig(): ConfigApp {
    const data = this.getData(KEY_CONFIG);
    if (data)
      return JSON.parse(data);
    else
      return {
        timeVote: 10000,
        pwd: 'votaciones2020'
      };
  }

  /**
   * Saves config
   */
  public saveConfig(config: ConfigApp) {
    localStorage.setItem(KEY_CONFIG, JSON.stringify(config));
  }

  /**
   * Gets candidates
   * @returns candidates 
   */
  public getCandidates(): Candidate[] {

    const data = this.getData(KEY_JSON);
    if (data)
      this.candidates = JSON.parse(data);
    else
      this.candidates = [
        CandidateWhite,
        {
          id: 1,
          names: 'Valentina',
          votes: 0,
          img: 'vote1.jpeg'
        }, {
          id: 2,
          names: 'Sebastian',
          votes: 0,
          img: 'vote2.jpeg'
        }
      ];

    return this.candidates;
  }

  /**
   * Gets item
   * @param key 
   * @returns  
   */
  private getData(key) {
    if (environment.production)
      return localStorage.getItem(key);
    else
      return null;
  }

  /**
   * Adds vote
   * @param candidate 
   */
  addVote(candidate: Candidate) {
    const index = this.candidates.findIndex(c => c.id == candidate.id);
    if (index >= 0)
      this.candidates[index].votes++;
    localStorage.setItem(KEY_JSON, JSON.stringify(this.candidates));

    this.inVote = true;
    setTimeout(() => this.inVote = false, 5000);
  }
}
