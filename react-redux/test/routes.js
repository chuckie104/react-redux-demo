import { Router, Route, hashHistory } from 'react-router';
import React from "react";
import App from "./containers/App"
import Files from "./containers/Files"
import { Provider } from 'react-redux'

export default function routes(store){
  console.log(Files);
  return(
        <div>
          <Route path="/" component={App} />
          <Route path="/file" component={Files} />
        </div>
  )
}
