export interface User {
  _id: string;
  studentId: string;
  gmail: string;
  accountType: 'BTS_CONNECTE' | 'BTS_LIBRE';
  department: string;
  year: number;
  isApproved: boolean;
  isVerified: boolean;
}

export interface Subject {
  _id: string;
  name: string;
  department: string;
  year: number;
  description: string;
}

export interface Chapter {
  _id: string;
  name: string;
  subject: string;
  order: number;
}

export interface Lesson {
  _id: string;
  title: string;
  chapter: string;
  content: string;
  pdfUrl?: string;
  order: number;
}

export interface Exercise {
  _id: string;
  title: string;
  chapter: string;
  description: string;
  questions: Array<{ question: string; answer?: string }>;
  pdfUrl?: string;
  order: number;
}

export interface Exam {
  _id: string;
  title: string;
  chapter: string;
  description: string;
  duration: number;
  questions: Array<{ question: string; answer?: string; points: number }>;
  pdfUrl?: string;
  totalPoints: number;
}
