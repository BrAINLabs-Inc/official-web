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
    title: 'All Roads Lead to TinyML: Workshop Resources!',
    description:
      'Explore session slides, Colab notebooks, and full source code for live demos on Raspberry Pi & Arduino microcontrollers from our hands-on workshop at SICET 2025.',
    content:
      "At SICET 2025 (SLIIT International Conference on Engineering and Technology), the BrAINLabs Research Group hosted a full-day hands-on workshop on Efficient Machine Learning in Engineering - and we're excited to share everything with the community!\n\nFrom theory to deployment, the session covered:\n- Model compression: pruning, quantization, knowledge distillation\n- Bio-inspired efficient architectures: including spiking neural networks\n- Real hardware deployment: running compressed models on Raspberry Pi and Arduino microcontrollers\n\nEverything is now open on GitHub: session slides, Google Colab notebooks you can run yourself, and full source code for two live demos - a real-time head-pose estimator on Raspberry Pi and an on-device plant-leaf health classifier on Arduino using TensorFlow Lite Micro.\n\nWhether you attended the session or are discovering TinyML for the first time, the repo is structured to walk you through it step by step, with no prior TinyML experience needed.\n\nExplore the repo on GitHub: https://github.com/BrAINLabs-Inc\n\nHuge thanks to our facilitators: Dr. Mahima Weerasinghe Ph.D., Dr. Dharshana Kasthurirathna, Dr. Nushara Wedasingha, Dr. Dinuka Sahabandu (University of Washington), Ms. Madusha Weerasooriya, Mr. Asiri Gawesha, and Mr. Sanka Mohottala.",
    created_at: '2025-08-20T10:00:00Z',
    updated_at: '2025-08-20T10:00:00Z',
    author: 'BrAIN Labs Research Group',
    keywords: ['TinyML', 'SICET 2025', 'Edge AI', 'Model Compression', 'Arduino', 'Raspberry Pi'],
    imageUrl: '/assets/TinyML25.png',
  },
  {
    id: 2,
    title: 'Does Order Matter? Curriculum Learning for Training Deep Neural Networks (MERCon 2026)',
    description:
      'Discover theoretical foundations, scoring functions, pacing schedules, and hands-on Colab tutorials from our MERCon 2026 pre-conference workshop.',
    content:
      'Curriculum Learning (CL) is a brain-inspired training paradigm that mirrors how humans acquire complex skills - by learning from simple concepts first and gradually progressing to harder ones. Although CL has been shown to improve convergence speed, optimization stability, generalization, and computational efficiency, it remains under-explored within machine learning research.\n\nThis workshop bridges the gap with conceptual clarity and hands-on Colab sessions covering Theoretical Foundations, Difficulty & Pacing, Regime Comparison (baseline vs curriculum vs self-paced vs anti-curriculum), Empirical Evaluation, and Domain Applications across Computer Vision (CV) and Graph Neural Networks (CLNode).\n\nOrganized by BrAINLabs Research Group, SLIIT | Funded by SLIIT Research & International (Grant No. PVC(R&I)RG/2025/12).\nRepository & Notebooks: https://github.com/BrAINLabs-Inc/MERcon_2026_CL_Workshop\n\nFacilitators: Mr. Dulara Madusanka, Mr. Asiri Gawesha, Mr. Sanka Mohottala, Ms. Savini Kommalage.\nOrganizers: Dr. Dharshana Kasturirathna, Dr. Mahima Weerasinghe.',
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-08-10T10:00:00Z',
    author: 'BrAIN Labs Research Group',
    keywords: ['Curriculum Learning', 'MERCon 2026', 'Deep Learning', 'GNN', 'Optimization'],
    imageUrl: '/assets/MERCon26.png',
  },
  {
    id: 3,
    title: 'Exploring Spiking Neural Networks: ICAC 2024 Workshop Resources',
    description:
      'Access standalone Colab notebooks, slides, and documentation covering Izhikevich & LIF neuron models, STDP learning, and MNIST SNN vs ANN benchmarks.',
    content:
      'Spiking Neural Networks (SNNs) communicate through discrete spike events, closely mimicking biological brain dynamics. Unlike traditional ANNs with continuous activations, SNNs fire binary spikes at specific moments in time - enabling energy-efficient computation on neuromorphic hardware.\n\nThis ICAC 2024 workshop covers:\n- Session 1: Izhikevich & LIF Neuron Models\n- Session 2: STDP (Spike-timing Dependent Plasticity) Learning Algorithm\n- Session 3: SNN & ANN Implementation with MNIST Dataset\n\nRepository: https://github.com/BrAINLabs-Inc/ICAC_2024_SNN_workshop\nStandalone Colab notebooks and documentation are included in the open repository.',
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z',
    author: 'BrAIN Labs Research Group',
    keywords: ['SNN', 'ICAC 2024', 'Izhikevich', 'LIF', 'STDP', 'Neuromorphic'],
    imageUrl: '/assets/SNN24.png',
  },
];
