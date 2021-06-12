import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Form, Radio, Container, Segment } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/users';
import '../questions.css'

export class Question extends Component {

  state = {
    value: ''
  }

  handleClick = () => {
    this.props.history.push('/home');
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer, history } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
      history.push('/home')
    }
  }

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Container>
        <Segment>
          <Header as="h4">Would you rather</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group grouped>
              <label>
                <Form.Field>
                  <Radio
                    label={question.optionOne.text}
                    name="radioGroup"
                    value="optionOne"
                    checked={this.state.value === 'optionOne'}
                    onChange={this.handleChange}
                    className='card-input-element'
                  />
                  <br />
                  or
                  <br />
                  <Radio
                    label={question.optionTwo.text}
                    name="radioGroup"
                    value="optionTwo"
                    checked={this.state.value === 'optionTwo'}
                    onChange={this.handleChange}
                    className='card-input-element'
                  />
                </Form.Field>
              </label>

            </Form.Group>
            <Form.Field>
              <Button
                color="green"
                size="tiny"
                fluid
                positive
                disabled={disabled}
                content="Submit"
              />
            </Form.Field>
          </Form>
        </Segment>

        <Button size="tiny" floated="right" onClick={this.handleClick}>
          Back
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ authedUser }) => { return { authedUser } }


export default withRouter(connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(Question));
