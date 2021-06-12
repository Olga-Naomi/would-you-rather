import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Segment, Header, Grid, Image, Label } from 'semantic-ui-react';
import Question from './Question';
import Result from './Result';
import Overview from './Overview';


const views = {
  OVERVIEW: 'OVERVIEW',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const QuestionContent = props => {
  const { view, question, unanswered } = props;

  switch (view) {
    case views.OVERVIEW:
      return <Overview question={question} unanswered={unanswered} />;
    case views.QUESTION:
      return <Question question={question} />;
    case views.RESULT:
      return <Result question={question} />;
    default:
      return;
  }
};

export class QuestionCard extends Component {

  render() {
    const {
      author,
      question,
      view,
      badUrl,
      unanswered = null
    } = this.props;

    if (badUrl === true) {
      return <Redirect to="/questions/wrong_id" />;
    }

    const colors = {
      green: {
        name: 'green',
        hex: '#38AC30'
      },
      blue: {
        name: 'blue',
        hex: '#2185d0'
      },
      grey: {
        name: null,
        hex: '#d4d4d5'
      }
    };

    const tabColor = unanswered === true ? colors.green : colors.blue
    const labelColor = unanswered === true ? 'green' : 'blue'
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`;

    return (
      <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          style={{ borderTop: borderTop }}
        >
          <span>{author.name} asks:</span>
        </Header>
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={6}>
              <QuestionContent
                view={view}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Segment.Group>
                <Header as="h5" block attached="top" content="Votes" />
                <Segment>
                  <Label circular color={labelColor} size="big">
                    {question.optionOne.votes.length + question.optionTwo.votes.length}
                  </Label>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ users, questions, authedUser }, { match, id }) => {

  let question,
    author,
    view,
    badUrl = false;

  if (id === undefined) {
    const { id } = match.params;

    question = questions[id];
    const user = users[authedUser.id];

    if (question === undefined) {
      badUrl = true;
    } else {
      author = users[question.author];
      view = views.QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        view = views.RESULT;
      }
    }
  } else {
    question = questions[id];
    author = users[question.author];
    view = views.OVERVIEW;
  }

  return {
    badUrl,
    question,
    author,
    view
  };
}

export default withRouter(connect(mapStateToProps)(QuestionCard))