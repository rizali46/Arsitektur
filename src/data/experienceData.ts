export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer (Portfolio Project)',
    company: 'Independent Developer',
    period: '2025 — Present',
    description: 'Building responsive web applications using React, Vite, TypeScript, and Node.js with modern CSS styling frameworks like Tailwind CSS.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'exp-2',
    role: 'Game Developer & C# Scripter',
    company: 'Indie Game Prototypes',
    period: '2026',
    description: 'Developed interactive 3D gameplay prototypes in Unity using C#, implementing custom physics raycasting, animation blend trees, and UI tracking.',
    skills: ['C#', 'Unity', 'Game Mechanics', 'Git'],
  },
];