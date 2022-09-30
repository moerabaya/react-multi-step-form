import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { employeeReducer, formDataReducer, formErrorsReducer, formStepReducer } from "../reducers";
import rootSaga from "../saga";

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    formStep: formStepReducer,
    formData: formDataReducer,
    formErrors: formErrorsReducer,
    employee: employeeReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
  },
});

SagaMiddleware.run(rootSaga);