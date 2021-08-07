import React, { Component } from "react"
import NavBar from "./navbar"
import Home from "./pages/Home"
import Show from "./pages/Show"
import { Route, Switch } from "react-router-dom"
import "./App.css"

import { BlandDataProvider } from "./hooks/useBlandData"

class App extends Component {

  render() {
    return (
      <BlandDataProvider>
        <React.Fragment>
          <div className="mainContainer" >
            <NavBar />
            <Switch>
              <Route path="/show/:showId" render={props => <Show {...props} />} />
              <Route path="/" render={() => <Home />} />
            </Switch>
          </div>
        </React.Fragment>
        {/* <div className="footer" /> */}

      </BlandDataProvider>
    )
  }
}

export default App