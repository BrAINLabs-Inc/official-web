export interface BlogPostItem {
  id: number;
  title: string;
  description: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  author: string;
  keywords: string[];
  imageUrl: string;
}

export const blogPosts: BlogPostItem[] = [
  {
    id: 1,
    title: 'Exploring Spiking Neural Networks for Edge AI',
    description:
      'How bio-inspired event-driven algorithms reduce computational power requirements in real-world intelligent systems.',
    content:
      'Spiking Neural Networks (SNNs) represent the third generation of neural networks, capturing biological neural dynamics through discrete event pulses. By integrating temporal dynamics and spike-timing-dependent plasticity (STDP), SNNs achieve remarkable energy efficiency on specialized neuromorphic hardware...',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
    author: 'BrAIN Labs Researchers',
    keywords: ['SNN', 'Neuromorphic', 'Edge AI', 'Energy Efficiency'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&q=80',
  },
  {
    id: 2,
    title: 'Quantization & Pruning in Modern Transformer Architecture',
    description:
      'A deep dive into model compression techniques for deploying Large Language Models on resource-constrained devices.',
    content:
      'Large Language Models have revolutionized artificial intelligence, yet their massive scale presents deployment challenges. In this article, we cover quantization, structured pruning, and knowledge distillation techniques optimized for edge devices...',
    created_at: '2025-01-20T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    author: 'BrAIN Labs Researchers',
    keywords: ['LLM', 'Compression', 'Quantization', 'Transformers'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&q=80',
  },
];
