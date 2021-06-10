import logo from '../logo.svg';
import '../App.css';
import LoadingBar from "react-redux-loading";
import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { initialisation } from "../actions/shared";
import Login from './Login'
import Home from './Home'
import NewPoll from './NewPoll'
import BadUrl from './BadUrl'
import Nav from './Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(initialisation())
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">

            <header className="App-header">
              <h1 className='center'>Would You Rather</h1>
            </header>
            {
              authedUser === null ? (
                <Route
                  render={() => (
                    <Login />
                  )}
                />
              ) : (

                <Fragment>
                  
                  {authedUser !== null && <Nav />}
                  
                  <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/new' exact component={NewPoll} />
                    <Route component={BadUrl} />
                  </Switch>
                </Fragment>

              )

            }
          </div>
        </Fragment>
      </Router>

    );
  }
}


function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
