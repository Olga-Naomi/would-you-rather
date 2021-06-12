import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import '../navbar.css'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from "react-redux-loading";

class Nav extends Component {

  handlelogout = e => {
  
    const { dispatch } = this.props
    dispatch(showLoading())
    dispatch(setAuthedUser(null))
    dispatch(hideLoading())

  }

  render() {

    const liStyle = {
      float: 'right'
    };

    const { authedUser } = this.props
    return (
      <nav className='nav'>
        <ul id='nav-list'>
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
            <NavLink to='/add' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li style={liStyle} className="dropdown">
            <NavLink to='#'> {authedUser.name}</NavLink>
            <div className="dropdown-content">
              <Menu.Item
                name='logout'
                onClick={this.handlelogout}
              />
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ authedUser })=>  {return {authedUser}}

export default connect(mapStateToProps)(Nav)