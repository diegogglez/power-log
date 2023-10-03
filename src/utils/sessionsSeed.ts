import { Session } from "src/app/models/workouts";

export const sessionsSeed: Session[] = [
  {
    id: '1',
    date: '02/10/2023',
    workoutName: 'Torso 1',
    sessionTime: '01:36:48',
    exercises: [
      {
        name: 'weighted pull ups',
        enterRpe: false,
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
        name: 'Handstand push ups',
        enterRpe: true,
        sets: [
          {
            weight: 0,
            reps: 5,
            rir: null,
            rpe: 8,
            done: true
          },
          {
            weight: 0,
            reps: 3,
            rir: null,
            rpe: 9,
            done: true
          },
          {
            weight: 0,
            reps: 2,
            rir: null,
            rpe: 9,
            done: true
          },
          {
            weight: 0,
            reps: 2,
            rir: null,
            rpe: 9,
            done: true
          },
        ]
      },
      {
        name: 'Australian Pull ups',
        enterRpe: false,
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
        enterRpe: false,
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
    date: '05/10/2023',
    workoutName: 'Pierna 1',
    sessionTime: '01:50:32',
    exercises: [
      {
        name: 'High bar squats',
        enterRpe: true,
        sets: [
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 7,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 7.5,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 8,
            done: true
          },
          {
            weight: null,
            reps: 8,
            rir: null,
            rpe: 8.5,
            done: false
          },
        ]
      },
      {
        name: 'Leg extensions',
        enterRpe: false,
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
        enterRpe: false,
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
        enterRpe: false,
        sets: [
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: true
          },
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: true
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
  {
    id: '3',
    date: '09/10/2023',
    workoutName: 'Torso 1',
    sessionTime: '01:36:48',
    exercises: [
      {
        name: 'weighted pull ups',
        enterRpe: false,
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
        name: 'Handstand push ups',
        enterRpe: true,
        sets: [
          {
            weight: 0,
            reps: 5,
            rir: null,
            rpe: 8,
            done: true
          },
          {
            weight: 0,
            reps: 3,
            rir: null,
            rpe: 9,
            done: true
          },
          {
            weight: 0,
            reps: 2,
            rir: null,
            rpe: 9,
            done: true
          },
          {
            weight: 0,
            reps: 2,
            rir: null,
            rpe: 9,
            done: true
          },
        ]
      },
      {
        name: 'Australian Pull ups',
        enterRpe: false,
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
        enterRpe: false,
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
    id: '4',
    date: '12/10/2023',
    workoutName: 'Pierna 1',
    sessionTime: '01:50:32',
    exercises: [
      {
        name: 'High bar squats',
        enterRpe: true,
        sets: [
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 7,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 7.5,
            done: true
          },
          {
            weight: 90,
            reps: 5,
            rir: null,
            rpe: 8,
            done: true
          },
          {
            weight: null,
            reps: 8,
            rir: null,
            rpe: 8.5,
            done: false
          },
        ]
      },
      {
        name: 'Leg extensions',
        enterRpe: false,
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
        enterRpe: false,
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
        enterRpe: false,
        sets: [
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: true
          },
          {
            weight: null,
            reps: 10,
            rir: 2,
            done: true
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