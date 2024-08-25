import React from 'react'
import Sectionwrapper from './Sectionwrapper'
import ExerciseCard from './ExerciseCard'

const Workout = (props) => {
  const {workout} = props
  return (
    <Sectionwrapper id={'workout'} header={"Welcome To"}   title={["The", "Danger", "Zone"]}>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, i) =>{
          return (
            <ExerciseCard i={i} exercise = {exercise} key={i} />
          )
        })}
      </div>
    </Sectionwrapper>
  )
}

export default Workout  