import { Workout } from "src/app/models/workouts";
import { v4 as uuidv4 } from 'uuid';

export const workoutSeed: Workout[] = [
  {
    id: uuidv4(),
    name: 'Torso 1',
    description: '',
    exercises: [
      {
        id: uuidv4(),
        name: 'weighted pull ups',
        sets: 4,
        reps: 8,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'Australian Pull ups',
        sets: 4,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'barbell row',
        sets: 3,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'biceps curl',
        sets: 2,
        reps: 10,
        rir: 2
      },
    ]
  },
  {
    id: uuidv4(),
    name: 'Pierna 1',
    description: '',
    exercises: [
      {
        id: uuidv4(),
        name: 'High bar squats',
        sets: 4,
        reps: 10,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'leg extensions',
        sets: 3,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'Bulgarian Squats',
        sets: 3,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'hip thrust',
        sets: 3,
        reps: 15,
        rir: 2
      },
    ]
  },
  {
    id: uuidv4(),
    name: 'Torso 2',
    description: '',
    exercises: [
      {
        id: uuidv4(),
        name: 'Handstand pull ups',
        sets: 4,
        reps: 3,
        rir: 1
      },
      {
        id: uuidv4(),
        name: 'push ups',
        sets: 4,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'military press',
        sets: 3,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'french press',
        sets: 2,
        reps: 15,
        rir: 2
      },
    ]
  },
  {
    id: uuidv4(),
    name: 'pierna 2',
    description: '',
    exercises: [
      {
        id: uuidv4(),
        name: 'deadlift',
        sets: 4,
        reps: 10,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'hamstring curl',
        sets: 4,
        reps: 12,
        rir: 2
      },
      {
        id: uuidv4(),
        name: 'Calf raises',
        sets: 3,
        reps: 12,
        rir: 2
      }
    ]
  },
]