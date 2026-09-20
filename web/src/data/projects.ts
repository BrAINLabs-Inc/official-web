export interface ProjectCategory {
  id: string;
  name: string;
  count: number;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'LLMs' | 'Neuromorphic';
  author?: string;
  diagramUrl?: string;
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'LLMs',
    name: 'LARGE LANGUAGE MODELS',
    count: 3,
    description:
      'Developing deep learning models that simulate brain activity to help researchers understand neural dynamics.',
  },
  {
    id: 'Neuromorphic',
    name: 'NEUROMORPHIC COMPUTING',
    count: 2,
    description:
      'Utilizing machine learning techniques to analyze neuroimaging data for the early detection of neurological disorders.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Optimized Compression for Transformers',
    description:
      'Designing efficient techniques to reduce the size and computational requirements of transformer-based models while maintaining their accuracy. This work focuses on model pruning, quantization, and other compression methods to enhance scalability and deployment on resource-constrained systems.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 2,
    title: 'Security and Privacy of LLM',
    description:
      'Investigating vulnerabilities in large language models and developing robust solutions to mitigate risks, including adversarial attacks, data leakage, and model misuse. This ensures LLMs can operate securely in sensitive applications, such as healthcare and finance.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 3,
    title: 'Applications of LLM for Cybersecurity',
    description:
      'Utilizing the advanced reasoning and pattern recognition capabilities of LLMs to detect and mitigate cyber threats. Applications include automated threat intelligence, phishing detection, and generating secure coding recommendations to prevent vulnerabilities.',
    category: 'LLMs',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 4,
    title: 'Learning Algorithms for Spiking Neural Networks (SNN)',
    description:
      'Developing algorithms tailored to SNNs, which emulate the biological neuron spiking process. These algorithms focus on event-driven learning paradigms, enabling real-time processing with low energy consumption, suitable for edge AI systems.',
    category: 'Neuromorphic',
    author: 'BrAIN Labs Research Group',
  },
  {
    id: 5,
    title: 'Applications of SNN',
    description:
      'Exploring the use of SNNs in robotics, prosthetics, and neuromorphic hardware. These applications leverage the brain-inspired efficiency of SNNs to enable adaptive, low-power solutions for real-world problems, including speech recognition and autonomous navigation.',
    category: 'Neuromorphic',
    author: 'BrAIN Labs Research Group',
  },
];
