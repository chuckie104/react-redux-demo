import React,{Component} from "react";


export default class Btn extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {text,dispatch,handleClick} =this.props;
    return(
      <button onClick ={()=>{handleClick()}}>
          {text}
      </button>
    )
  }
}
