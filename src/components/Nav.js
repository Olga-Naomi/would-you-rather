import React from 'react'
import { Component } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import '../navbar.css'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  handlelogout = e => {
    //e.preventDefault()
    console.log(this.props)
    const { dispatch } = this.props

    dispatch(setAuthedUser(null)).then(()=>{
      useHistory.push(`/home`)
    })

  }

  render() {

    const liStyle = {
      float: 'right'
    };

    const { authedUser } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/home' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li style={liStyle} className="dropdown">
            <NavLink to='#'> {authedUser.name}</NavLink>
            <div className="dropdown-content">
              <NavLink onClick={() => this.handlelogout} to='/' exact activeClassName='active'>Logout</NavLink>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)