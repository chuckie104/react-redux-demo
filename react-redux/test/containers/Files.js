import React,{Component} from "react";
import {connect} from "react-redux";
import util from "../util"
import $ from "jquery";

import FileChild  from "../components/FileChild"
import HomeNav  from "../components/HomeNav"
import actions from "../actions/Files/filesAction";

const initialData = actions.initialData;

class Files extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount(){
    let {dispatch} = this.props;
    util.ajax("http://cloud.siui.com:8070/api/CaseMedical/GetByTags",{"tags":0,"sortField":"CreateDate","sortMode":0,"pageSize":10,"pageIndex":1},"get")
    .then((data)=>{
        dispatch(initialData(data.Rows));
    })
  }
  render(){
    let {filesList} = this.props;
    return(
      <div>
        <div className="allHeader">
          <p>全部档案</p>
          <img src={require("../images/ic_menu_add.png")} className="myFileAddLogo" />
          <img src={require("../images/search.png")} className="myFileAddLogo2"/>
        </div>
        <div className="myFileContent">
          <FileChild filesList={filesList}></FileChild>
        </div>
        <div className="noMore">
            已加载全部
        </div>
        <HomeNav number="one"></HomeNav>
      </div>
    )
  }
}


function select(state){
  return state.filesReducer

}


export default connect(select)(Files);
