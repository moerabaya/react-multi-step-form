import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { createEmployee, setEmployee } from "../actions";
import { sagaActions } from "./actions";
import EmployeeInterface from "multi-step-form";
import axios from "axios";


export function* postDataSaga(action: any) {
  try {
    // do api call
    const result: object = yield call(() => axios.post('https://thumbsnap.com/api/upload', action.payload.employee));
    console.log(result);
    yield put(setEmployee(action.payload.employee));
  } catch (e) {
    console.log("error");
    console.log(e);
  }

}

export default function* rootSaga() {
  yield takeEvery(sagaActions.POST_DATA_SAGA, postDataSaga);
}
