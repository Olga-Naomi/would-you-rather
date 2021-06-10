import React, { Component } from "react";
import { connect } from "react-redux";


class QuestionContainer extends Component {
    
    render() {

        console.log(this.props)
        const { questionData } = this.props

        return (
            <div>
                {questionData.answered}
                {questionData.unanswered}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    console.log('questions', questions)
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

export default connect(mapStateToProps)(QuestionContainer)