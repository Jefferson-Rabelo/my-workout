import Dexie, { type Table } from 'dexie'
import type { Workout } from '../types/workout'

class WorkoutDatabase extends Dexie {
  workouts!: Table<Workout, number>

  constructor() {
    super('MyWorkoutDatabase')
    this.version(1).stores({
      workouts: '++id, name, createdAt',
    })
    this.version(2).stores({
      workouts: '++id, name, createdAt, updatedAt',
    }).upgrade(async (transaction) => {
      const workouts = await transaction.table('workouts').toArray()
      await Promise.all(workouts.map((workout) => {
        const updatedAt = workout.updatedAt ?? workout.createdAt ?? new Date()
        return transaction.table('workouts').update(workout.id, { updatedAt })
      }))
    })
  }
}

export const db = new WorkoutDatabase()
