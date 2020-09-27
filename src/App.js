/**
 * @flow
 **/
import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Screens from './Screens'
import './App.css'
const logo = require('./logo.png')

type Props = {child: JSX.Element}

function Header () {
  return (
    <div className="header">
      <Container>
        <img className="logo" src={logo} />
      </Container>
    </div>
  )
}

function Content (props: Props) {
  return (
    <div className="content">
      {props.child}
    </div>
  )
}

function App () {
  return (
    <>
      <Header />
      <Container style={{ padding: 20, paddingTop: 100 }}>
        <Content child={
          <Router>
            <Switch>
              <Route exact path="/">
                <Screens.Post.List />
              </Route>
              <Route exact path="/post/:id">
                <Screens.Post.Detail />
              </Route>
              <Route exact path="/profile/:id">
                <Screens.User.Detail />
              </Route>
            </Switch>
          </Router>
        }/>
      </Container>
    </>
  )
}

export default App
