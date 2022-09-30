import { createReducer } from "@reduxjs/toolkit"
import EmployeeInterface from "multi-step-form"
import { nextStep, previousStep, setEmployee, updateErrors, updateForm } from "../actions"
export const formStepReducer = createReducer(0, (builder) => {
  builder.addCase(nextStep, (state, action) => state + 1)
  builder.addCase(previousStep, (state, action) => state - 1)
})
const defaultState: EmployeeInterface[] = [{}, {}, {}];

export const formDataReducer = createReducer(defaultState, (builder) => {
  builder.addCase(updateForm, (state: EmployeeInterface[], action) => {
    const updatedState = [...state];
    updatedState[action.payload.step] = {
      ...state[action.payload.step as any],
      [action.payload.name]: action.payload.value
    };
    return updatedState;
  })
})

export const formErrorsReducer = createReducer(defaultState, (builder) => {
  builder.addCase(updateErrors, (state: EmployeeInterface[], action) => {
    const updatedState = [...state];
    updatedState[action.payload.step] = action.payload.errors;
    return updatedState;
  })
})

export const employeeReducer = createReducer({}, (builder) => {
  builder.addCase(setEmployee, (state: any, action) => {
    return action.payload.employee;
  })
})