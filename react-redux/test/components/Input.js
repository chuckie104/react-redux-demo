import React,{Component} from "react";


export default class Input extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {dispatch,number}=this.props;

    return(
      <div>
          <input type="text" value={number}/>
      </div>
    )

  }
}
