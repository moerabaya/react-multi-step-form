import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import EmployeeInterface from "multi-step-form";
import { sagaActions } from "../saga/actions";

const NEXT = 'form/next';
const PREVIOUS = 'form/previous';

export const nextStep = createAction(NEXT);

export const previousStep = createAction(PREVIOUS);

export const fetchData = createAction<{}>("form/fetch");

export const updateForm = createAction('form/update', function prepare(step: number, name: string, value: string | object | number) {
  return {
    payload: {
      step,
      name,
      value
    },
  }
});

export const updateErrors = createAction('form/errors', function prepare(step: number, errors: {}) {
  return {
    payload: {
      step,
      errors
    },
  }
});

export const createEmployee = createAction(sagaActions.POST_DATA_SAGA, function prepare(employee: EmployeeInterface) {
  return {
    payload: {
      employee
    }
  }
});

export const setEmployee = createAction("employee/set", function prepare(employee: EmployeeInterface) {
  return {
    payload: {
      employee
    }
  }
});


export const updateEmployee = createAction("employee/update", function prepare(loading: boolean, failed: boolean) {
  return {
    payload: {
      loading,
      failed
    }
  }
});