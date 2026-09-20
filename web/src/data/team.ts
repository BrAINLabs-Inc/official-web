export interface Member {
  id: number;
  first_name: string;
  second_name: string;
  slug: string;
  contact_email: string;
  linkedin?: string;
  website?: string;
}

export interface Researcher {
  member_id: number;
  country: string | null;
  image_url: string | null;
  bio: string | null;
  occupation: string | null;
  workplace: string | null;
  status: 'current' | 'former';
  research_areas: string[];
  member: Member;
  educational_background?: { id: number; degree: string }[];
  ongoing_research?: { id: number; title: string }[];
}

export const researchers: Researcher[] = [
  // ── CURRENT MEMBERS (12) ───────────────────────────────────
  {
    member_id: 1,
    country: 'Sri Lanka',
    image_url: '/assets/images/mahima-weerasinghe.jpeg',
    bio: 'Researcher and Lead for Neuroinformatics at BrAIN Labs and SLIIT.',
    occupation: 'Researcher / Lead – Neuroinformatics',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Computational Neuroscience',
      'Artificial Neural Networks',
      'AI in Health',
      'AI in Agriculture',
    ],
    member: {
      id: 1,
      first_name: 'Dr. Mahima',
      second_name: 'Weerasinghe',
      slug: 'mahima-weerasinghe',
      contact_email: 'mahima.w@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 2,
    country: 'Sri Lanka',
    image_url: '/assets/images/dharshana_kasthurirathna.jpeg',
    bio: 'Senior Researcher and Mentor specializing in Network Science, Game Theory, and Machine Learning.',
    occupation: 'Senior Researcher / Mentor',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: ['Network Science', 'Game Theory', 'Information Theory', 'Machine Learning'],
    member: {
      id: 2,
      first_name: 'Dr. Dharshana',
      second_name: 'Kasthurirathna',
      slug: 'dharshana-kasthurirathna',
      contact_email: 'dharshana.k@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 3,
    country: 'Sri Lanka',
    image_url: '/assets/images/kapila_dissanayaka.jpeg',
    bio: 'Researcher and Lead for Explainable AI focusing on optical sensing, laser applications, and deep learning.',
    occupation: 'Researcher / Lead – Explainable AI',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Optical Sensing and Instrumentation',
      'Laser Applications',
      'Deep Learning for Astrophysics',
      'Nanofluidics',
    ],
    member: {
      id: 3,
      first_name: 'Dr. Kapila',
      second_name: 'Dissanayaka',
      slug: 'kapila-dissanayaka',
      contact_email: 'kapila.d@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 4,
    country: 'Sri Lanka',
    image_url: '/assets/images/jeewaka_perera.jpeg',
    bio: 'Researcher specializing in Neural Network Architectures, Multi-Objective Optimization, and Deep Reinforcement Learning.',
    occupation: 'Researcher',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Neural Network Architectures',
      'Multi-Objective Optimization',
      'Deep Reinforcement Learning',
      'Machine Learning',
    ],
    member: {
      id: 4,
      first_name: 'Mr. Jeewaka',
      second_name: 'Perera',
      slug: 'jeewaka-perera',
      contact_email: 'jeewaka.p@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 5,
    country: 'Sri Lanka',
    image_url: '/assets/images/asiri_gawesha.jpeg',
    bio: 'Graduate Research Assistant & MPhil Student working on Computer Vision, Deep Learning, and mobile applications.',
    occupation: 'Graduate Research Assistant / MPhil Student',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Mobile app development',
    ],
    member: {
      id: 5,
      first_name: 'Mr. Asiri',
      second_name: 'Gawesha',
      slug: 'asiri-gawesha',
      contact_email: 'asiri.g@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 6,
    country: 'USA',
    image_url: '/assets/images/dinuka-sahabandu.jpeg',
    bio: 'Researcher and Lead for Efficient AI at University of Washington focusing on optimization, reinforcement learning, and AI ethics.',
    occupation: 'Researcher / Lead – Efficient AI',
    workplace: 'University of Washington',
    status: 'current',
    research_areas: [
      'Optimization',
      'Reinforcement Learning',
      'Efficient Machine Learning',
      'AI Ethics',
    ],
    member: {
      id: 6,
      first_name: 'Dr. Dinuka',
      second_name: 'Sahabandu',
      slug: 'dinuka-sahabandu',
      contact_email: 'dinuka.s@uw.edu',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 7,
    country: 'Sri Lanka',
    image_url: '/assets/images/sanka_mohottala.jpeg',
    bio: 'Academic Instructor & MPhil Student researching Computer Vision, Graph Neural Networks, and Biomedical Engineering.',
    occupation: 'Academic Instructor / MPhil Student',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Computer Vision',
      'Graph Neural Networks',
      'Image Processing',
      'Biomedical Engineering',
    ],
    member: {
      id: 7,
      first_name: 'Mr. Sanka',
      second_name: 'Mohottala',
      slug: 'sanka-mohottala',
      contact_email: 'sanka.m@sliit.lk',
      linkedin: 'https://linkedin.com',
      website: 'https://sankamohottala.com',
    },
  },
  {
    member_id: 8,
    country: 'Sri Lanka',
    image_url: '/assets/images/nandun-samarasekara.jpeg',
    bio: 'Research Assistant focusing on Neuroinformatics, Machine Learning, and EEG-based Mindfulness.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Machine Learning',
      'Neuroinformatics',
      'Artificial Intelligence',
      'EEG-based Mindfulness',
    ],
    member: {
      id: 8,
      first_name: 'Mr. Nandun',
      second_name: 'Samarasekara',
      slug: 'nandun-samarasekara',
      contact_email: 'nandun.s@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 9,
    country: 'Sri Lanka',
    image_url: '/assets/images/hasitha-erandika.jpeg',
    bio: 'Research Assistant focusing on Bio-Inspired Computing, EEG-Based Cognitive Analysis, and AI for Human Wellbeing.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Machine Learning',
      'Bio-Inspired Computing',
      'EEG-Based Cognitive Analysis',
      'AI for Human Wellbeing',
    ],
    member: {
      id: 9,
      first_name: 'Mr. Hasitha',
      second_name: 'Erandika',
      slug: 'hasitha-erandika',
      contact_email: 'hasitha.e@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 10,
    country: 'Sri Lanka',
    image_url: '/assets/images/savini-kommalage.jpeg',
    bio: 'Research Assistant exploring Curriculum Learning, Reinforcement Learning, XAI, and Human Behaviour Understanding Frameworks.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: [
      'Curriculum Learning',
      'Reinforcement Learning',
      'Explainable Artificial Intelligence',
      'Human Behaviour Understanding Frameworks',
    ],
    member: {
      id: 10,
      first_name: 'Ms. Savini',
      second_name: 'Kommalage',
      slug: 'savini-kommalage',
      contact_email: 'savini.k@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 11,
    country: 'Sri Lanka',
    image_url: '/assets/images/krishmal-dinindu.jpeg',
    bio: 'Research Assistant researching Machine Learning, Neuroscience, and Artificial Intelligence.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: ['Machine Learning', 'Neuro Science', 'Artificial Intelligence'],
    member: {
      id: 11,
      first_name: 'Mr. Krishmal',
      second_name: 'Dinidu',
      slug: 'krishmal-dinidu',
      contact_email: 'krishmal.d@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    member_id: 12,
    country: 'Sri Lanka',
    image_url: '/assets/images/hasitha-hirushan.jpeg',
    bio: 'Research Assistant focusing on Machine Learning and Artificial Intelligence.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'current',
    research_areas: ['Machine Learning', 'Artificial Intelligence'],
    member: {
      id: 12,
      first_name: 'Mr. Hasitha',
      second_name: 'Hirushan',
      slug: 'hasitha-hirushan',
      contact_email: 'hasitha.h@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },

  // ── FORMER MEMBERS (2) ────────────────────────────────────
  {
    member_id: 13,
    country: 'Sri Lanka',
    image_url: '/assets/images/madhumini_gunaratne.jpeg',
    bio: 'Former Graduate Research Assistant specializing in Computational Neuroscience and AI in Health.',
    occupation: 'Graduate Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'former',
    research_areas: ['Computational Neuroscience', 'AI in Health'],
    member: {
      id: 13,
      first_name: 'Ms. Madhumini',
      second_name: 'Gunaratne',
      slug: 'madhumini-gunaratne',
      contact_email: 'madhumini.g@sliit.lk',
    },
  },
  {
    member_id: 14,
    country: 'Sri Lanka',
    image_url: '/assets/images/chethiya-galkaduwa.jpeg',
    bio: 'Former Research Assistant working on Machine Learning and Artificial Intelligence.',
    occupation: 'Research Assistant',
    workplace: 'Sri Lanka Institute of Information Technology',
    status: 'former',
    research_areas: ['Machine Learning', 'Artificial Intelligence'],
    member: {
      id: 14,
      first_name: 'Mr. Chethiya',
      second_name: 'Galkaduwa',
      slug: 'chethiya-galkaduwa',
      contact_email: 'chethiya.g@sliit.lk',
      linkedin: 'https://linkedin.com',
    },
  },
];
