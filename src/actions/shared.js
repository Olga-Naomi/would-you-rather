import { receiveUsers } from "./users";
import { receiveQuesitons } from './questions';
import { getInitialData } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading'


export function initialisation() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({ questions, users }) => {
            dispatch(receiveQuesitons(questions))
            dispatch(receiveUsers(users))
            dispatch(hideLoading())
        })
    }
}