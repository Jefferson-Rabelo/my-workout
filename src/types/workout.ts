export interface Exercise {
  id?: string
  name: string
  sets: number
  reps: string
  weight?: number
  notes?: string
}

export interface Workout {
  id?: number
  name: string
  exercises: Exercise[]
  createdAt: Date
  updatedAt: Date
}

export type NewWorkout = Omit<Workout, 'id'>
export type ExerciseInput = Omit<Exercise, 'id'>
