export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  commonMistakes: string[];
  tags: { specialty: string[]; condition: string[]; bodyPart: string[]; muscle: string[]; surgery: string[] };
  defaultSets: number;
  defaultReps: number;
  defaultHoldSecs: number;
  defaultFrequency: 'Daily' | '2x Daily' | 'Every Other Day' | '3x Weekly';
  videoUrl?: string;
  imageUrl?: string;
  physioAudioNote?: { from: string; duration: string; transcriptPreview: string };
}

export interface ProgramExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  holdSecs: number;
  frequency: 'Daily' | '2x Daily' | 'Every Other Day' | '3x Weekly';
}

export interface Program {
  id: string;
  name: string;
  description: string;
  exercises: ProgramExercise[];
  inPersonSessionsCompleted?: number;
  inPersonSessionsTotal?: number;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatarInitials: string;
  condition: string;
  conditionDetail: string;
  goal?: string;
}

export interface Physio {
  id: string;
  firstName: string;
  lastName: string;
  credentials: string;
  title: string;
  bio: string;
  avatarInitials: string;
  email: string;
  phone: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logoInitials: string;
}

export interface ExerciseNote {
  id: string;
  exerciseId: string;
  content: string;
  createdAt: string;
  authorRole: 'patient' | 'physio';
  authorName: string;
}

export interface CompletionEntry {
  date: string;
  exerciseIds: string[];
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'program_update' | 'reminder' | 'message';
  link?: string;
}
