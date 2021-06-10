import React, { Component } from "react";
import {connect} from 'react-redux'
import QuestionContainer from './QuestionContainer'




class Home extends Component {
    render() {
        return (
            <div>
               <QuestionContainer />
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


export default connect(mapStateToProps)(Home)