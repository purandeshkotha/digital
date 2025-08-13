// Common interfaces for the application

export interface User {
  name: string;
  role?: 'user' | 'admin';
}

export interface Quiz {
  id: string;
  categoryId: string;
  lessonId: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: number;
  duration: number;
  unlocked: boolean;
  completed: boolean;
  score?: number;
}

export interface Lesson {
  id: number;
  category: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  progress: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}