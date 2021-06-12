import logo from '../logo.svg';
import '../App.css';
import LoadingBar from "react-redux-loading";
import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { initialisation } from "../actions/shared";
import Login from './Login'
import Home from './Home'
import NewQuestion from './NewQuestion'
import BadUrl from './BadUrl'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import QuestionCard from './QuestionCard';


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
                <Route path='/'
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
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard}/>
                    <Route path='/questions/wrong_id' exact component={BadUrl}/>
                    <Route path='/questions/:id' exact component={QuestionCard}/>
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


const mapStateToProps = ({ authedUser })=>  {return {authedUser}}

export default connect(mapStateToProps)(App)
