export interface ProjectCategory {
  id: 'LLMs' | 'Neuromorphic' | 'Platforms & Apps' | 'Hardware & BCI';
  name: string;
  count: number;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'LLMs' | 'Neuromorphic' | 'Platforms & Apps' | 'Hardware & BCI';
  author?: string;
  githubUrl?: string;
  notice?: string;
  images?: string[];
  videoUrl?: string;
  logoUrl?: string;
  badge?: string;
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'LLMs',
    name: 'LARGE LANGUAGE MODELS & CURRICULUM LEARNING',
    count: 4,
    description:
      'Developing deep learning models, transfer teacher curriculum frameworks, and secure LLM architectures.',
  },
  {
    id: 'Neuromorphic',
    name: 'NEUROMORPHIC COMPUTING & SNNs',
    count: 2,
    description:
      'Event-driven spiking neural network algorithms and energy-efficient edge processing.',
  },
  {
    id: 'Platforms & Apps',
    name: 'MINDFULNESS & MEDITATION PLATFORMS',
    count: 2,
    description:
      'Mobile apps and web platforms developed in collaboration with SLIIT and Centre for Meditation Research (CMR).',
  },
  {
    id: 'Hardware & BCI',
    name: 'NEUROINFORMATICS & EEG HARDWARE',
    count: 1,
    description:
      'Real-time brain-computer interface (BCI) hardware setups using the OpenBCI Ultracortex Mark IV EEG headset.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Transfer Teacher Curriculum Training Framework',
    description:
      'Compact research codebase for confusion-aware transfer teacher curriculum learning, anti-curriculum, and standard deep learning training regimes on CIFAR-10.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
    githubUrl: 'https://github.com/BrAINLabs-Inc/confusion-aware-transfer-teacher',
  },
  {
    id: 2,
    title: 'Optimized Compression for Transformers',
    description:
      'Designing efficient techniques to reduce the size and computational requirements of transformer-based models while maintaining their accuracy. This work focuses on model pruning, quantization, and other compression methods to enhance scalability and deployment on resource-constrained systems.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 3,
    title: 'Security and Privacy of LLM',
    description:
      'Investigating vulnerabilities in large language models and developing robust solutions to mitigate risks, including adversarial attacks, data leakage, and model misuse. This ensures LLMs can operate securely in sensitive applications, such as healthcare and finance.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 4,
    title: 'Applications of LLM for Cybersecurity',
    description:
      'Utilizing the advanced reasoning and pattern recognition capabilities of LLMs to detect and mitigate cyber threats. Applications include automated threat intelligence, phishing detection, and generating secure coding recommendations to prevent vulnerabilities.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 5,
    title: 'Learning Algorithms for Spiking Neural Networks (SNN)',
    description:
      'Developing algorithms tailored to SNNs, which emulate the biological neuron spiking process. These algorithms focus on event-driven learning paradigms, enabling real-time processing with low energy consumption, suitable for edge AI systems.',
    category: 'Neuromorphic',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 6,
    title: 'Applications of SNN',
    description:
      'Exploring the use of SNNs in robotics, prosthetics, and neuromorphic hardware. These applications leverage the brain-inspired efficiency of SNNs to enable adaptive, low-power solutions for real-world problems, including speech recognition and autonomous navigation.',
    category: 'Neuromorphic',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 7,
    title: 'MindFlow Platform: Mental Wellness & Mindfulness Mobile App',
    description:
      'MindFlow is a mobile app created for a mindfulness research study by SLIIT and BrAIN Labs. It helps participants track their daily stress, mood, and sleep, answer weekly reflection questions, and complete questionnaires. The app makes it easy for researchers to collect data while giving participants a simple way to follow their mental wellness.',
    category: 'Platforms & Apps',
    author: 'SLIIT & BrAIN Labs Research Group',
    githubUrl: 'https://github.com/BrAINLabs-Inc/mindflow-platform',
    notice: 'We will be releasing a public version soon.',
    images: ['/assets/projects/mindflow1.jpg', '/assets/projects/mindflow2.jpg'],
    badge: 'Mobile App & Platform',
  },
  {
    id: 8,
    title: 'Centre for Meditation Research (CMR) Platform Development',
    description:
      'We are collaboratively working on platform development with the Centre for Meditation Research (CMR) for their online meditation course modules and research platform.',
    category: 'Platforms & Apps',
    author: 'BrAIN Labs & Centre for Meditation Research (CMR)',
    logoUrl: '/cmr-logo.png',
    images: ['/assets/projects/cmr-home.png'],
    badge: 'Institutional Collaboration',
  },
  {
    id: 9,
    title: 'Ultracortex Mark IV OpenBCI EEG Headset & BCI Setup',
    description:
      'Our lab recently acquired the OpenBCI Ultracortex Mark IV EEG headset for real-time brain-computer interface (BCI) research, neuroinformatics data collection, and cognitive workload analysis.',
    category: 'Hardware & BCI',
    author: 'BrAIN Labs Neuroinformatics Lab',
    images: ['/assets/projects/BCI1.png', '/assets/projects/BCI2.png.jpg'],
    videoUrl: '/assets/projects/BCI3.mp4',
    badge: 'Lab Equipment & BCI Hardware',
  },
];
