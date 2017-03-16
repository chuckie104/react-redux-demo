import React,{Component} from "react";
import {connect} from "react-redux";
import util from "../util"
import $ from "jquery";

import FileChild  from "../components/FileChild"
import HomeNav  from "../components/HomeNav"
import actions from "../actions/Files/filesAction";

const height =util.height()- util.rem()*1.8;
const MissHeight =util.rem()*0.8;
const initialData = actions.initialData;
const moreFilesList = actions.moreFilesList;
let flage=true;

class Files extends Component{
  constructor(props){
    super(props);
    this.state={
      top:util.rem()*0.8,
      pageNumber:1
    }
  }
  componentDidMount(){
  
    let {dispatch} = this.props;
    util.ajax("http://cloud.siui.com:8070/api/CaseMedical/GetByTags",{"tags":0,"sortField":"CreateDate","sortMode":0,"pageSize":20,"pageIndex":1},"get")
    .then((data)=>{
        dispatch(initialData(data.Rows));
    })
  }

  //滑动加载
  handleScroll(){
    let {dispatch} = this.props;
    let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度

    let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高度

    let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
    console.log();

    if((clientHeight+scrollTop)==(scrollHeight)){
      let {pageNumber} =this.state;
      let self =this;
      util.ajax("http://cloud.siui.com:8070/api/CaseMedical/GetByTags",{"tags":0,"sortField":"CreateDate","sortMode":0,"pageSize":20,"pageIndex":pageNumber+1},"get")
      .then((data)=>{
          self.setState({pageNumber:pageNumber+1});
          dispatch(moreFilesList(data.Rows));
      })
    }
  }

  touchstart(event){
    let targetTouches = event.targetTouches[0];
    this.setState({pageY:targetTouches.pageY});
  }

  touchmove(event){
    let {dispatch} = this.props;
    let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
    let targetTouches = event.targetTouches[0];
    //触摸屏幕时y的数值
    let pageY = this.state.pageY;
    //移动的差值
    let disPageY = targetTouches.pageY-pageY;
    if(disPageY>0&&scrollTop==0){
      this.setState({top:disPageY});
      if(disPageY>150&&flage){
        flage=false;
        //放手之后
        util.ajax("http://cloud.siui.com:8070/api/CaseMedical/GetByTags",{"tags":0,"sortField":"CreateDate","sortMode":0,"pageSize":20,"pageIndex":1},"get")
        .then((data)=>{
            flage=true;
            dispatch(initialData(data.Rows));
        })
      }
    }
  }

  touchend(event){
    if(this.state.top>MissHeight){

      var timer =  setInterval(function(){
          this.setState({top:this.state.top-10});
          if(this.state.top<=MissHeight){
            this.setState({top:MissHeight});
            clearInterval(timer);
          }
        }.bind(this),10)
    }
  }

  render(){
    let {filesList} = this.props;
    return(
      <div >
        <div className="allHeader">
          <p>全部档案</p>
          <img src={require("../images/ic_menu_add.png")} className="myFileAddLogo" />
          <img src={require("../images/search.png")} className="myFileAddLogo2"/>
        </div>
        <div className="allContent"
        ref="bodyBox"
        style={{height:height,top:this.state.top}}
        onScroll={(event)=>this.handleScroll(event)}
        onTouchStart={(event)=>this.touchstart(event)}
        onTouchMove={(event)=>this.touchmove(event)}
        onTouchEnd={(event)=>this.touchend(event)}>
          <div className="myFileContent"
           >
            <FileChild filesList={filesList}></FileChild>
            <div className="noMore">
                已加载全部
            </div>
          </div>
        </div>
      </div>
    )
  }
}

        // <HomeNav number="one"></HomeNav>

function select(state){
  return state.filesReducer
}


export default connect(select)(Files);
