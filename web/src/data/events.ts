export interface WorkshopResource {
  type: string;
  description: string;
  link: string;
}

export interface WorkshopSession {
  session: string;
  description: string;
  notebookUrl?: string;
  notebookLabel?: string;
}

export interface EventItem {
  id: number;
  type: string;
  title: string;
  conference: string;
  date: string;
  detailsUrl: string;
  imageUrl?: string;
  upcoming?: boolean;
  description?: string;
  highlights?: string[];
  repoUrl?: string;
  grantInfo?: string;
  license?: string;
  facilitators?: string[];
  organizers?: string[];
  sessions?: WorkshopSession[];
  resources?: WorkshopResource[];
  documentation?: string[];
  references?: string[];
}

export const eventsData: EventItem[] = [
  {
    id: 1,
    type: 'Full-Day Hands-on Workshop',
    title: 'All Roads Lead to TinyML: Workshop Resources!',
    conference: 'SICET 2025 (SLIIT International Conference on Engineering and Technology)',
    date: 'August 2025',
    detailsUrl: 'https://github.com/BrAINLabs-Inc',
    imageUrl: '/assets/TinyML25.png',
    description:
      "At SICET 2025, the BrAINLabs Research Group hosted a full-day hands-on workshop on Efficient Machine Learning in Engineering - and we're excited to share everything with the community! From theory to deployment, the session covered model compression, bio-inspired architectures, and real hardware deployment on Raspberry Pi and Arduino microcontrollers.",
    highlights: [
      'Model compression: pruning, quantization, knowledge distillation',
      'Bio-inspired efficient architectures: including spiking neural networks',
      'Real hardware deployment: running compressed models on Raspberry Pi and Arduino microcontrollers',
    ],
    repoUrl: 'https://github.com/BrAINLabs-Inc',
    facilitators: [
      'Dr. Mahima Weerasinghe Ph.D.',
      'Dr. Dharshana Kasthurirathna',
      'Dr. Nushara Wedasingha',
      'Dr. Dinuka Sahabandu (University of Washington)',
      'Ms. Madusha Weerasooriya',
      'Mr. Asiri Gawesha',
      'Mr. Sanka Mohottala',
    ],
    upcoming: false,
  },
  {
    id: 2,
    type: 'ICAC 2024 Pre-Conference Workshop',
    title: 'Exploring Spiking Neural Networks (SNNs)',
    conference: 'ICAC 2024 (6th International Conference on Advancements in Computing)',
    date: 'December 2024',
    detailsUrl: 'https://github.com/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
    imageUrl: '/assets/SNN24.png',
    description:
      'Spiking Neural Networks (SNNs) communicate through discrete spike events, closely mimicking biological brain dynamics. Unlike traditional ANNs with continuous activations, SNNs fire binary spikes at specific moments in time - enabling energy-efficient computation on neuromorphic hardware.',
    repoUrl: 'https://github.com/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
    highlights: [
      'Biological neuron models: Izhikevich & Leaky Integrate-and-Fire (LIF)',
      'Spike-Timing-Dependent Plasticity (STDP) unsupervised learning algorithm',
      'Surrogate gradients & backpropagation through time for deep SNNs',
      'Hands-on MNIST classification benchmarks comparing SNN vs ANN performance',
    ],
    sessions: [
      {
        session: 'Session 1 - Part 1',
        description: 'Izhikevich Neuron Model',
        notebookUrl:
          'https://colab.research.google.com/github/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
        notebookLabel: 'Open in Colab',
      },
      {
        session: 'Session 1 - Part 2',
        description: 'LIF (Leaky Integrate-and-Fire) Neuron Model',
        notebookUrl:
          'https://colab.research.google.com/github/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
        notebookLabel: 'Open in Colab',
      },
      {
        session: 'Session 2',
        description: 'STDP Learning Algorithm',
        notebookUrl:
          'https://colab.research.google.com/github/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
        notebookLabel: 'Open in Colab',
      },
      {
        session: 'Session 3 - Part 1',
        description: 'SNN Implementation with MNIST Dataset',
        notebookUrl:
          'https://colab.research.google.com/github/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
        notebookLabel: 'Open in Colab',
      },
      {
        session: 'Session 3 - Part 2',
        description: 'ANN Implementation with MNIST Dataset',
        notebookUrl:
          'https://colab.research.google.com/github/BrAINLabs-Inc/ICAC_2024_SNN_workshop',
        notebookLabel: 'Open in Colab',
      },
    ],
    documentation: [
      'Introduction to SNNs: What SNNs are and why temporal spikes matter',
      'Neuron Models: Izhikevich and LIF mathematical dynamics explained',
      'STDP Learning: Spike-timing dependent plasticity mechanics',
      'Training SNNs: Surrogate gradients and backpropagation through time',
      'Results and Comparison: SNN vs ANN power & accuracy trade-offs on MNIST',
    ],
    references: [
      'Training Spiking Neural Networks Using Lessons From Deep Learning (Taverni et al.)',
      'Dynamical Systems in Neuroscience: The Geometry of Excitability and Bursting (Izhikevich)',
      'Theoretical Neuroscience (Dayan & Abbott)',
      'BRIAN2: Python based Spiking Neural Networks Library',
      'snnTorch: Gradient based Spiking Neural Networks Training Library',
      'NeuCube-Py & Neural Data Science (Univ. of Tübingen)',
    ],
    upcoming: false,
  },
  {
    id: 3,
    type: 'MERCon 2026 Workshop',
    title: 'Does Order Matter? Curriculum Learning for Training Deep Neural Networks',
    conference: 'MERCon 2026 (12th Moratuwa Engineering Research Conference)',
    date: 'August 2026',
    detailsUrl: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
    imageUrl: '/assets/MERCon26.png',
    description:
      'Curriculum Learning (CL) is a brain-inspired training paradigm that mirrors how humans acquire complex skills - by learning from simple concepts first and gradually progressing to harder ones. Although CL improves convergence speed, optimization stability, generalization, and computational efficiency, it remains under-explored. This workshop provides conceptual clarity and practical hands-on Colab tutorials.',
    grantInfo:
      'Organized by BrAINLabs Research Group, SLIIT | Funded by SLIIT Research & International (Grant No. PVC(R&I)RG/2025/12)',
    license: 'MIT License (Code) / CC BY 4.0 (Slides & Documentation)',
    repoUrl: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
    highlights: [
      'Theoretical Foundations: Intuition, continuation methods, and structured difficulty in optimization',
      'Difficulty & Pacing: Designing scoring functions alongside pacing schedules',
      'Regime Comparison: Baseline vs Curriculum vs Self-Paced vs Anti-Curriculum training',
      'Empirical Evaluation: Impact on training stability, data-efficiency, and generalization',
      'Domain Applications: Computer Vision (CV), Graph Neural Networks (GNNs), and Multi-Modal Learning',
    ],
    resources: [
      {
        type: 'Slides',
        description: 'Introduction to Curriculum Learning: Foundations and Intuition',
        link: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Slides',
        description: 'CL Theory: Scoring Functions, Pacing Schedules, and Their Coupling',
        link: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Slides',
        description: 'Curriculum Learning with Computer Vision',
        link: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Slides',
        description:
          'When CL Fails, When CL Wins: Disentangling Scoring and Pacing (ICML GlobalSouthML)',
        link: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Colab Notebook',
        description: 'Applying pre-defined curriculum learning to an image classification problem',
        link: 'https://colab.research.google.com/github/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Slides',
        description: 'Curriculum Graph Machine Learning',
        link: 'https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
      {
        type: 'Colab Notebook',
        description: 'CLNode: Curriculum Learning for Node Classification',
        link: 'https://colab.research.google.com/github/BrAINLabs-Inc/MERcon_2026_CL_Workshop',
      },
    ],
    facilitators: [
      'Mr. Dulara Madusanka (SLIIT - it24101566@my.sliit.lk)',
      'Mr. Asiri Gawesha (SLIIT - asiri.l@sliit.lk)',
      'Mr. Sanka Mohottala (USJ - sanka.mo@sliit.lk)',
      'Ms. Savini Kommalage (SLIIT - it24100641@my.sliit.lk)',
    ],
    organizers: [
      'Dr. Dharshana Kasturirathna (UCSC - dka@ucsc.cmb.ac.lk)',
      'Dr. Mahima Weerasinghe (SLIIT - mahima.w@sliit.lk)',
    ],
    upcoming: false,
  },
];

export const tinyMLWorkshopInfo = {
  title: 'Workshop Resources & Repositories',
  description:
    'Find open-source slides, standalone Google Colab notebooks, and live hardware demo code across all BrAINLabs workshops on GitHub.',
  resourcesUrl: 'https://github.com/BrAINLabs-Inc',
  buttonText: 'Explore GitHub Repositories',
};
