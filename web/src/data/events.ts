export interface EventItem {
  id: number;
  type: string;
  title: string;
  conference: string;
  date: string;
  detailsUrl: string;
  upcoming?: boolean;
}

export const eventsData: EventItem[] = [
  {
    id: 1,
    type: 'Pre-Conference Workshop',
    title: 'TinyML: A Compact Revolution in Engineering AI',
    conference: 'MERCon (Moratuwa Engineering Research Conference)',
    date: 'August 2025',
    detailsUrl: 'https://github.com/BrAINLabs-Inc',
    upcoming: false,
  },
  {
    id: 2,
    type: 'Pre-Conference Workshop',
    title: 'All Roads Lead to TinyML: The Rome of Efficient Machine Learning in Engineering',
    conference: 'SICET (SLIIT International Conference on Engineering and Technology)',
    date: 'August 2025',
    detailsUrl: 'https://github.com/BrAINLabs-Inc',
    upcoming: false,
  },
];

export const tinyMLWorkshopInfo = {
  title: 'TinyML Workshops',
  description: 'Find recordings, materials, and workshop details at:',
  resourcesUrl: 'https://github.com/BrAINLabs-Inc',
  buttonText: 'Access Resources',
};
