import React, { Component } from 'react';
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';

// Create these files
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import { logout } from './helpers/firebase';
import { firebaseAuth } from './config/firebase';

import './App.css';

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}


class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <HashRouter>
        <div>
          <nav className="Nav">
            <ul>
              <li>
                <Link to="/" className="Nav__item">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="Nav__item">Dashboard</Link>
              </li>
              <li>
                {this.state.authenticated
                  ? <button
                    onClick={ () => {logout()} }
                    className="Nav__item button">
                      Logout
                    </button>
                  : <span>
                    <Link to="/login" className="Nav__item">Login</Link>
                    <Link to="/register" className="Nav__item">Register</Link>
                  </span>}
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <PublicRoute authenticated={this.state.authenticated} path='/login' component={Login} />
              <PublicRoute authenticated={this.state.authenticated} path='/register' component={Register} />
              <PrivateRoute authenticated={this.state.authenticated} path='/dashboard' component={Dashboard} />
              <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
          </main>
        </div>
      </HashRouter>
    )
  }
}

export default App;
