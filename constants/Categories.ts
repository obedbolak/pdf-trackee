export type DefaultCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export const DEFAULT_CATEGORIES: DefaultCategory[] = [
  { id: 'work',      name: 'Work',      icon: '💼', color: '#4A90E2' },
  { id: 'personal',  name: 'Personal',  icon: '🏠', color: '#7ED321' },
  { id: 'study',     name: 'Study',     icon: '📚', color: '#F5A623' },
  { id: 'finance',   name: 'Finance',   icon: '💰', color: '#50E3C2' },
  { id: 'health',    name: 'Health',    icon: '❤️', color: '#E74C3C' },
  { id: 'other',     name: 'Other',     icon: '📁', color: '#9B59B6' },
];
