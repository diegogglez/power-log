import { RMItem } from "src/app/models/rms";
import { v4 as uuidv4 } from 'uuid';

export const rmsSeed: RMItem[] = [
  {
    id: uuidv4(),
    rm: 113.90,
    weight: 100,
    units: 'kg',
    reps: 3,
    rpe: 8.5,
    exercise: 'Deadlift',
    date: '14/9/2023'
  },
  {
    id: uuidv4(),
    rm: 216.92,
    weight: 200,
    units: 'kg',
    reps: 3,
    rpe: 9,
    exercise: 'Deadlift',
    date: '15/9/2023'
  },
  {
    id: uuidv4(),
    rm: 57.94,
    weight: 50,
    units: 'kg',
    reps: 3,
    rpe: 8,
    exercise: 'Overhead Press',
    date: '16/9/2023'
  },
  {
    id: uuidv4(),
    rm: 202.98,
    weight: 150,
    units: 'kg',
    reps: 8,
    rpe: 8,
    exercise: 'Deadlift',
    date: '17/9/2023'
  },
  {
    id: uuidv4(),
    rm: 56.24,
    weight: 55,
    units: 'kg',
    reps: 1,
    rpe: 9.5,
    exercise: 'Overhead Press',
    date: '18/9/2023'
  },
  {
    id: uuidv4(),
    rm: 56.05,
    weight: 50,
    units: 'kg',
    reps: 3,
    rpe: 9,
    exercise: 'Pull Ups',
    date: '19/9/2023'
  },
  {
    id: uuidv4(),
    rm: 107.53,
    weight: 90,
    units: 'kg',
    reps: 5,
    rpe: 9,
    exercise: 'Bench Press',
    date: '20/9/2023'
  },
  {
    id: uuidv4(),
    rm: 57.94,
    weight: 50,
    units: 'kg',
    reps: 2,
    rpe: 7,
    exercise: 'Pull Ups',
    date: '21/9/2023'
  },
  {
    id: uuidv4(),
    rm: 131.42,
    weight: 110,
    units: 'kg',
    reps: 3,
    rpe: 7,
    exercise: 'Squats',
    date: '22/9/2023'
  },
  {
    id: uuidv4(),
    rm: 127.80,
    weight: 120,
    units: 'kg',
    reps: 1,
    rpe: 8.5,
    exercise: 'Squats',
    date: '23/9/2023'
  },
]