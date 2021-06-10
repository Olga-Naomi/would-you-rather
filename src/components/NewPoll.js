import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveQuestion } from '../actions/questions'
import { Form } from 'semantic-ui-react'



class NewPoll extends Component {

    state = {
        text: '',
        toHome: false
    }

    handleChange = e => {
        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state
        const { dispatch } = this.props


        dispatch(saveQuestion(text))

        this.setState(() => ({
            text: '',
            toHome: true
        }))
    }


    render() {

        const { text, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/home' />
        }

        const questionLeft = 280 - text.length


        return (
            <Fragment>
                <h3 className='center'>Create new Poll</h3>
                <form className='new-poll' onSubmit={this.handleSubmit}>
                    <Form.TextArea
                        style={{ width: "300px", height:"150px" }}
                        placeholder="Would You Rather?"
                        value={text}
                        onChange={this.handleChange}
                        maxLength={280}
                    />

                    {questionLeft <= 100 && (
                        <div className='poll-length'>
                            {questionLeft}
                        </div>
                    )}
                    <Form.Button disabled={text === ''}>Post</Form.Button>

                </form>
            </Fragment>


        )
    }
}

export default connect()(NewPoll)