import React from 'react'
import axios from "axios";
import { Route, Switch, Redirect} from 'react-router-dom'
import withLogin from '@/components/Hoc';
import {adminRoute} from "./routes";

import Frame from "./components/Frame";
class App extends React.Component {
  constructor(){
    super();
  }

  render() {
    
    return(<div>
        <Frame>
            <Switch>
              {
                adminRoute.map(item => {
                  return <Route key={item.pathname} path={item.pathname} component={item.component} exact={item.exact}/>
                })
              }
              <Redirect from="/" to="/login" exact />
              <Redirect to="/404"/>
            </Switch>
        </Frame>
    </div>) 
    
  }
}
export default withLogin(App)