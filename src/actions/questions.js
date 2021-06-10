export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuesitons(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function saveQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }

}