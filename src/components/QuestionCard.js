import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import Question from './Question';
import Result from './Result';
import Overview from './Overview';


const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT'
};

const QuestionContent = props => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <Overview question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <Question question={question} />;
    case pollTypes.POLL_RESULT:
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
      pollType,
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

    const tabColor = unanswered === true ? colors.green : colors.blue;
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
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <QuestionContent
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, id }
) {
 
  let question,
    author,
    pollType,
    badUrl = false;

  if (id === undefined) {
    const { id } = match.params;

    question = questions[id];
    const user = users[authedUser.id];

    if (question === undefined) {
      badUrl = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  } else {
    question = questions[id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  }

  return {
    badUrl,
    question,
    author,
    pollType
  };
}

export default withRouter(connect(mapStateToProps)(QuestionCard))