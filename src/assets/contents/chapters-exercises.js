import chapter2Exercises from './chapter2/chapter2.exercises.json'
import chapter2ExercisesFunction from './chapter2/chapter2.exercises-functions.js'
import chapter3Exercises from './chapter3/chapter3.exercises.json'
import chapter3ExercisesFunction from './chapter3/chapter3.exercises-functions.js'
export default [
  {
    title: 'Chapter 2 - Drawing With 2D Vectors',
    subtitle: 'This chapter is about',
    subItems: chapter2Exercises.basic,
    exerciseFunctions: chapter2ExercisesFunction().basic,
  },
  {
    title: 'Chapter 2 - Trigonmetry',
    subtitle: '',
    subItems: chapter2Exercises.trigonmetry,
    exerciseFunctions: chapter2ExercisesFunction().trigonmetry,
  },
  {
    title: 'Chapter 3 - Aritemetic in 3D',
    subtitle: '',
    subItems: chapter3Exercises.arithmetic,
    exerciseFunctions: chapter3ExercisesFunction().arithmetic,
  },
]
