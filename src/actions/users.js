import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return dispatch => {

        console.log(answer)

        dispatch(showLoading())
        dispatch(addAnswerToUser(authedUser.id, qid, answer));
        dispatch(addAnswerToQuestion(authedUser.id, qid, answer));

        return saveQuestionAnswer(authedUser.id, qid, answer).catch(e => {
            console.warn('Error in handleSaveQuestionAnswer:', e);
        }).then(() => dispatch(hideLoading()));
    };
}

function addAnswerToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    };
}

export function addQuestionToUser({ id, author }) {
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    };
}