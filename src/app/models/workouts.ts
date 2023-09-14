export interface Session {
  id: string;
  date: string;
  exercises: Exercise[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  units?: string;
  rir?: number;
  rpe?: number;
}