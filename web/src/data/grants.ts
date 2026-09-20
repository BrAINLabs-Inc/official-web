export interface Grant {
  id: number;
  title: string;
  description: string | null;
  passed_date: string | null;
  expire_date: string | null;
  grant_document?: { id: number; doc_url: string; doc_label: string | null }[];
}

export const grants: Grant[] = [
  {
    id: 1,
    title: 'Brain-Inspired Neuromorphic Computing Research Grant',
    description:
      'Funding research into energy-efficient spiking neural network models and hardware integration.',
    passed_date: '2024-01-01',
    expire_date: '2026-12-31',
  },
];

export const statsData = {
  researchers: 10,
  projects: 5,
  publications: 3,
};
