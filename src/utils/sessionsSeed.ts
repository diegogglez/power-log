import { Session } from "src/app/models/workouts";

export const sessionsSeed: Session[] = [
  {
    id: '1',
    date: '18/9/2023',
    workoutName: 'Torso 1',
    sessionTime: '01:36:48',
    exercises: [
      {
        name: 'weighted pull ups',
        sets: [
          {
            weight: 20,
            reps: 8,
            rir: 2,
            done: true
          },
          {
            weight: 20,
            reps: 8,
            rir: 2,
            done: true
          },
          {
            weight: null,
            reps: 8,
            rir: 2,
            done: false
          },
          {
            weight: null,
            reps: 8,
            rir: 2,
            done: false
          },
        ]
      },
      {
        name: 'Australian Pull ups',
        sets: [
          {
            weight: 30,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: 25,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: 25,
            reps: 12,
            rir: 2,
            done: true
          },
        ]
      },
      {
        name: 'barbell row',
        sets: [
          {
            weight: 25,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: 25,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: null,
            reps: 12,
            rir: 2,
            done: false
          },
          {
            weight: null,
            reps: 12,
            rir: 2,
            done: false
          },
        ]
      },
    ]
  },
  {
    id: '2',
    date: '20/9/2023',
    workoutName: 'Pierna 1',
    sessionTime: '01:50:32',
    exercises: [
      {
        name: 'High bar squats',
        sets: [
          {
            weight: 90,
            reps: 5,
            rir: 2,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: 2,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: 2,
            done: true
          },
          {
            weight: null,
            reps: 8,
            rir: 2,
            done: false
          },
        ]
      },
      {
        name: 'Leg extensions',
        sets: [
          {
            weight: 50,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: 45,
            reps: 12,
            rir: 2,
            done: true
          },
          {
            weight: 40,
            reps: 12,
            rir: 2,
            done: true
          }
        ]
      },
      {
        name: 'Bulgarian squats',
        sets: [
          {
            weight: 15,
            reps: 10,
            rir: 2,
            done: true
          },
          {
            weight: 15,
            reps: 10,
            rir: 2,
            done: true
          },
          {
            weight: 15,
            reps: 10,
            rir: 2,
            done: true
          },
        ]
      },
      {
        name: 'Hip trust',
        sets: [
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: false
          },
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: false
          },
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: false
          },
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: false
          },
        ]
      },
    ]
  },

]