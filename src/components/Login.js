import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from "react-router-dom";

class Login extends Component {

    state = {
        username: '',
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

        this.setState(() => ({
            username
        }))


    }

    render() {
        const { users } = this.props
        const { username, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <select
                        onChange={this.handleSelection}>
                        <option>Select User</option>
                        {
                            Object.entries(users).map(([key, value]) => (
                                <option key={value.id} value={value.id}>{value.name}</option>
                            ))
                        }
                    </select>
                    <button className='btn' type='submit' disabled={username === ''}>Submit</button>

                </form>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }

}


export default connect(mapStateToProps)(Login)

