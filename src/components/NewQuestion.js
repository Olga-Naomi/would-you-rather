import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'
import {
    Form,
    Divider,
    Container,
    Segment
} from 'semantic-ui-react'



class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleChange = e => {

        this.setState(() => ({
            [e.target.id]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser.id))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))
    }


    render() {

        const { toHome } = this.state

        const disabled = this.state.optionOne === '' || this.state.optionTwo === '' ? true : false

        if (toHome === true) {
            return <Redirect to='/home' />
        }


        return (
            <Fragment>
                <Container>
                    <Segment color='green'>
                    <h3 className='center'>Create new Poll</h3>
                    <h4>Would You Rather</h4>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            id="optionOne"
                            placeholder="Enter option one..."
                            value={this.state.optionOne}
                            onChange={this.handleChange}
                            required
                        />
                        <Divider horizontal>Or</Divider>
                        <Form.Input
                            id="optionTwo"
                            placeholder="Enter option two..."
                            value={this.state.optionTwo}
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Button positive size="tiny" fluid disabled={disabled}>
                            Submit
                        </Form.Button>
                    </Form>
                    </Segment>
                </Container>
            </Fragment>


        )
    }
}

const mapStateToProps = ({ authedUser })=>  {return {authedUser}}
    

export default connect(mapStateToProps)(NewQuestion)