import { Router, Route, hashHistory,IndexRoute } from 'react-router';
import React from "react";
import App from "./containers/App"
import Files from "./containers/Files"
import HomeNav from "./components/HomeNav"
import { Provider } from 'react-redux'

export default function routes(store){
  console.log(Files);
  return(
        <div>
          <Route path="/" component={HomeNav} >
                <IndexRoute component={App}/>
                <Route path="file" component={Files} />
          </Route>
        </div>
  )
}
