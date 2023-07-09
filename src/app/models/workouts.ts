export interface Workout {
  id: string;
  name: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
  units?: string;
  rir?: number | null;
  rpe?: number | null;
}