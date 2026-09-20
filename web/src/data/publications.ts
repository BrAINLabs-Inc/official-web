export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  doi?: string;
  link: string;
  year: number;
  type: 'Journal' | 'ArXiv Preprint' | 'Conference Paper' | 'Article';
}

export const publications: Publication[] = [
  {
    id: 1,
    title: 'Mental Stress Recognition on the Fly Using SNNs',
    authors: 'M. Weerasinghe, G. Y. Wang, J. Whalley, M. Crook-Ramsey',
    venue: 'Nature Scientific Reports',
    doi: 'DOI: 10.21203/rs.3.rs-1841009/v1',
    link: 'https://doi.org/10.21203/rs.3.rs-1841009/v1',
    year: 2023,
    type: 'Journal',
  },
  {
    id: 2,
    title: 'Ensemble Plasticity and Network Adaptability in SNNs',
    authors: 'M. Weerasinghe, D. Parry, G. Y. Wang, J. Whalley',
    venue: 'ArXiv Preprint',
    link: 'https://arxiv.org/abs/2301.00000',
    year: 2023,
    type: 'ArXiv Preprint',
  },
  {
    id: 3,
    title:
      'Incorporating Structural Plasticity Approaches in Spiking Neural Networks for EEG Modelling',
    authors: 'M. Weerasinghe, J. I. Espinosa-Ramos, G. Y. Wang, D. Parry',
    venue: 'IEEE Access',
    doi: 'DOI: 10.1109/ACCESS.2021.3099492',
    link: 'https://doi.org/10.1109/ACCESS.2021.3099492',
    year: 2021,
    type: 'Journal',
  },
];
