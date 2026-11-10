export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quadriceps'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'abs'

export type ExerciseCategory = 'compound' | 'isolation'

export const MUSCLE_GROUP_NAMES: Record<MuscleGroup, string> = {
  chest: 'Peito',
  back: 'Costas',
  shoulders: 'Ombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  forearms: 'Antebraços',
  quadriceps: 'Quadríceps',
  hamstrings: 'Posteriores de coxa',
  glutes: 'Glúteos',
  calves: 'Panturrilhas',
  abs: 'Abdômen',
}

export interface CatalogExercise {
  id: string
  name: string
  primaryMuscleGroup: MuscleGroup
  secondaryMuscleGroups: MuscleGroup[]
  category: ExerciseCategory
  equipment: string[]
  instructions: string[]
  suggestedSets: number
  suggestedReps: string
}
