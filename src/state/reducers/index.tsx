import { createReducer } from "@reduxjs/toolkit"
import { nextStep, previousStep, updateErrors, updateForm } from "../actions"

export const formStepReducer = createReducer(0, (builder) => {
  builder.addCase(nextStep, (state, action) => state + 1)
  builder.addCase(previousStep, (state, action) => state - 1)
})

export const formDataReducer = createReducer({
  0: {},
  1: {},
  2: {}
}, (builder) => {
  builder.addCase(updateForm, (state: any, action) => {
    return Object.assign({}, state, {
      [action.payload.step]: {
        ...state[action.payload.step as any],
        [action.payload.name]: action.payload.value
      }
    });
  })
})


export const formErrorsReducer = createReducer({
  0: {},
  1: {},
  2: {}
}, (builder) => {
  builder.addCase(updateErrors, (state: any, action) => {
    return Object.assign({}, state, {
      [action.payload.step]: action.payload.errors
    });
  })
})