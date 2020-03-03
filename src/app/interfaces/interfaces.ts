export interface Candidate {
    names: string;
    img?: string;
    id: number;
    idCss?: string;
    votes?: number;
}

export const CandidateWhite: Candidate = {
    id: 0,
    names: 'Voto en Blanco',
    idCss: 'vote-white',
    votes: 0
}