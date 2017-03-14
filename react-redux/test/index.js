import React from 'react'
import { render } from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import { composeWithDevTools,devToolsEnhancer } from 'redux-devtools-extension'
import reducers from './reducers/reducers'
import "./css/style.scss";
import  "./css/base.css";

let init ={
  _selectLeft:true
}
//createStore传入的参数是一个函数
const store = createStore(reducers, devToolsEnhancer(

  // other store enhancers if any
));


let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
