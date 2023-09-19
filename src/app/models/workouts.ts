export interface Session {
  id: string;
  workoutName: string;
  date: string;
  sessionTime: string;
  exercises: any;
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
  rest?: string;
  reps?: number;
  weight?: number;
  rir?: number;
  rpe?: number;
}