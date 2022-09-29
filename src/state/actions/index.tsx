import { createAction } from "@reduxjs/toolkit";

const NEXT = 'form/next';
const PREVIOUS = 'form/previous';

export const nextStep = createAction(NEXT);
export const previousStep = createAction(PREVIOUS);

export const fetchData = createAction<{}>("form/fetch");

export const updateForm = createAction('form/update', function prepare(step: number, name: string, value: string) {
  return {
    payload: {
      step,
      name,
      value
    },
  }
});

export const updateErrors = createAction('form/errros', function prepare(step: number, errors: {}) {
  return {
    payload: {
      step,
      errors
    },
  }
});