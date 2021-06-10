import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";

export function questions(state = {}, action) {
    switch (action) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:

            const { question } = action;

            return {
                ...state,
                [question.id]: question
            }
        default:
            return state

    }
}