import React from "react";
import { useState } from "react";
import Sectionwrapper from "./Sectionwrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{index}</p>
        <h4 className="text-xl sm:text-xl md:text-2xl lg:text-3xl ">{title}</h4>
      </div>
      <p className=" text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const {poison , setPoison, muscles , setMuscles , goals , setGoals, updateWorkout} = props
  const [showModal, setShowModal] = useState(false);
  
  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <Sectionwrapper id ={'generate'}
      header={"Generate Your Workout"}
      title={["It's", "Huge", "O'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border border-blue-400 rounded-lg duration-200 hover:border-blue-700 py-3 px-1 " +
                (type === poison ? "border-blue-600" : "border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock On Targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 p-3 flex flex-col border w-full border-solid border-blue-400 rounded-lg ">
        <button
          onClick={toggleModal}
          className="w-full flex relative items-center justify-center"
        >
          <p>{muscles.length==0 ?'Select Muscle Group':muscles.join(' ')}</p>
          <i className="absolute right-3 top-1/2 -translate-y-1/2 fa-solid fa-caret-down"></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select Your Ultimate Objective."}
      />
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoals(scheme);
              }}
              className={
                "bg-slate-950 border border-blue-400 rounded-lg duration-200 hover:border-blue-700 py-3 px-1 " +
                (scheme === goals ? "border-blue-600" : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func = {updateWorkout} text={"Formulate"}/>
    </Sectionwrapper>
  );
}
