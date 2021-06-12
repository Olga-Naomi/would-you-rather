import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

class Login extends Component {

    state = {
        username: '',
        disabled: true,
        toHome: false
    }

    handleSubmit = e => {
        e.preventDefault()
        const username = this.state.username
        const { dispatch, users } = this.props



        dispatch(setAuthedUser(users[username]))
        this.setState(() => ({
            toHome: users[username] ? true : false
        }))
    }

    handleSelection = (e) => {
        const username = e.target.value

        console.log(username)
        if (username !== '') {
            this.setState(() => ({
                username,
                disabled : false
            }))
        }else{
            this.setState(() => ({
                disabled : true
            }))
            alert('No user name selected!')
        }


    }

    render() {
        const { users } = this.props
        const { toHome, disabled } = this.state


        if (toHome === true) {
            return <Redirect to='/home' />
        }
        return (
            <Container>
                <Segment>
                    <h3>Login</h3>

                    <form onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <select
                            onChange={this.handleSelection}>
                            <option value=''>Select User</option>
                            {
                                Object.entries(users).map(([key, value]) => (
                                    <option key={value.id} value={value.id}>{value.name}</option>
                                ))
                            }
                        </select>
                        <button className='btn' type='submit' disabled={disabled}>Submit</button>

                    </form>
                </Segment>

            </Container>

        )
    }
}

const mapStateToProps = ({ users })=> {return {users}}
    
export default connect(mapStateToProps)(Login)

