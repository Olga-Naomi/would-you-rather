import React, { Component } from "react";
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import QuestionContainer from './QuestionContainer'




class Home extends Component {
    render() {
        const { questionData } = this.props
        return (

            <Container>
                <QuestionContainer questionData={questionData} />
            </Container>

        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
    const answeredIds = Object.keys(users[authedUser.id].answers);
    const answered = Object.values(questions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);


    return {
        questionData: {
            answered,
            unanswered
        }
    };
}


export default connect(mapStateToProps)(Home)