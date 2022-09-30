import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { setEmployee, nextStep, updateEmployee } from "../actions";
import { sagaActions } from "./actions";
import EmployeeInterface from "multi-step-form";
import axios from "axios";


export function* postDataSaga(action: any) {
  try {
    yield put(updateEmployee(true, false));
    const result: object = yield call(() => axios.postForm('https://httpbin.org/post', action.payload.employee,
      {headers: {'content-type': 'application/x-www-form-urlencoded'}}
    ));
    console.log(result);
    yield put(setEmployee(action.payload.employee));
    yield put(nextStep());
  } catch (e) {
    yield put(updateEmployee(false, true));
    console.log(e);
  }

}

export default function* rootSaga() {
  yield takeEvery(sagaActions.POST_DATA_SAGA, postDataSaga);
}
