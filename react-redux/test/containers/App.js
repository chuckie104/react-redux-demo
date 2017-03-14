import React ,{Component,PropTypes} from "react";
import {connect} from "react-redux";
import util from "../util"
import $ from "jquery";

//引入方法与常量
import actions from "../actions/FriendGroup/friendGroupAction";
import FriendGroupList  from "../components/FriendGroupList"

//
const SelectLeft = actions.selectLeft;
const SelectRight = actions.selectRight;
const InitChaorenList=actions.initChaorenList;
const InitFriendList=actions.initFriendList;
const choseLiked=actions.choseLiked;
const choseFriendLiked=actions.choseFriendLiked;
const getMoreChaorenList =actions.getMoreChaorenList;
const getMoreFriendList =actions.getMoreFriendList;
//全局变量
let pageY = 0;
let disPageY =0;
const MissHeight = util.rem()*1.6;


class App extends Component {
    constructor(props){
      super(props);
      this.state={
        pageY:0,
        isMore:true,
        hasRefresh:true,
        pageNo:1,
        pageNo2:1
      }
    }

    componentDidMount(){
        let dispatch =this.props.dispatch;
        //拉数据
        let url = this.props.url;
        let self =this;
        //拿超人圈数据
        util.ajax("http://cloud.siui.com:8070/api/Forum",{"pageNumber":1,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
        .then((data)=>{
            dispatch(InitChaorenList(data.Rows));
        })
        //拿朋友圈数据
        util.ajax("http://cloud.siui.com:8070/api/Forum/GetByFollowing",{"pageNumber":1,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
        .then((data)=>{
          dispatch(InitFriendList(data.Rows));
        })
    }

    //点赞
    dianzan(index){
       //首先判断是超人圈还是好友圈的数据
       let {_selectLeft,initChaorenReducers,initFriendReducers,dispatch} =this.props;
       //当前点击的元素的点赞状态
       let isLiked=false;
       //当前点击的元素的id
       let ForumID ="";
       //当前点击元素点赞的数量
       let number = 0;

       //超人圈
       if(_selectLeft){
          isLiked=initChaorenReducers[index].liked;
          ForumID = initChaorenReducers[index].vForum.ForumID;
       }else{
          isLiked=initFriendReducers[index].liked;
          ForumID = initFriendReducers[index].vForum.ForumID;
       }
       util.ajax("http://cloud.siui.com:8070/api/ForumLiker",JSON.stringify({likeType:!isLiked,ForumID:ForumID}),"post")
       .then((data)=>{
         if(data.errorType==0){
          if(_selectLeft){

              number = isLiked? initChaorenReducers[index].likerCount-1:initChaorenReducers[index].likerCount+1
              dispatch(choseLiked(index,!isLiked,number));
           }else{
             number = isLiked? initFriendReducers[index].likerCount-1:initFriendReducers[index].likerCount+1
             dispatch(choseFriendLiked(index,!isLiked,number));
           }
         }
       })
    }

    //手指触到屏幕
    touchstart(event){
      let targetTouches = event.targetTouches[0];
      this.setState({pageY:targetTouches.pageY});

    }
    //手指滑动
    touchmove(event){
      let touchPageY =this.state.pageY; //触摸时的y轴
      let targetTouches = event.targetTouches[0];
      let {_selectLeft,dispatch} =this.props;

      let srollPos = $(window).scrollTop();   //滚动条距顶部距离(页面超出窗口的高度)
        // console.log(srollPos);
      let totalheight= parseFloat($(window).height()) + parseFloat(srollPos);
      let range =50;
      //下啦情况
      if(targetTouches.pageY-touchPageY>0){
        //除去上面头部与nav的高度
        let pageMoveY=targetTouches.pageY-touchPageY+MissHeight;

        //改变滑动距离要回调。因为异步
        this.setState({pageMoveY:pageMoveY},()=>{

          //下啦刷新
          if(this.state.pageMoveY>150&&this.state.hasRefresh){
            this.setState({hasRefresh:false});
            let self = this;
            if(_selectLeft){
              util.ajax("http://cloud.siui.com:8070/api/Forum",{"pageNumber":1,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
              .then((data)=>{
                dispatch(InitChaorenList(data.Rows));
                //
                //页数到回1
                self.setState({pageNo:1});
              })
            }else{
              util.ajax("http://cloud.siui.com:8070/api/Forum/GetByFollowing",{"pageNumber":1,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
              .then((data)=>{
              dispatch(InitFriendList(data.Rows));
                //
                //页数到回1
                self.setState({pageNo2:1});
              })
            }

          }
        });
      }else{
        //滑动加载更多
          if(($(document).height()-range) <= totalheight &&this.state.isMore ) {

            let self =this;
            //开关关掉
            self.setState({isMore:false});

            if(_selectLeft){
              let pageNo = self.state.pageNo+1;
              util.ajax("http://cloud.siui.com:8070/api/Forum",{"pageNumber":pageNo,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
              .then((data)=>{
                //数组进行拼接
                dispatch( getMoreChaorenList(data.Rows));
                //打开开关
                self.setState({isMore:true});
                //页数+1
                self.setState({pageNo:pageNo});
              })
            }else{
              let pageNo = self.state.pageNo2+1;
              util.ajax("http://cloud.siui.com:8070/api/Forum/GetByFollowing",{"pageNumber":pageNo,"pageSize":8,"sortName":"ForumID","sortOrder":"desc","where":null},"get")
              .then((data)=>{
                //数组进行拼接
                dispatch(getMoreFriendList (data.Rows));
                //打开开关
                self.setState({isMore:true});
                //页数+1
                self.setState({pageNo2:pageNo});
              })
            }

          }
      }
    }
    //滑动结束
    touchend(event){
      //下啦刷新
      if(this.state.pageMoveY>MissHeight){
        var timer =  setInterval(function(){
            this.setState({pageMoveY:this.state.pageMoveY-10});
            if(this.state.pageMoveY<=MissHeight){
              this.setState({pageMoveY:MissHeight});
              //打开下啦刷新的开关
              this.setState({hasRefresh:true});
              clearInterval(timer);
            }
          }.bind(this),10)
      }
    }


  render(){
    const {_selectLeft,dispatch,initChaorenReducers,initFriendReducers,friendList} =this.props;
    return(
      <div>
        <div className="personalCenter">
            <div className="allHeader">
                <p >超人圈</p>
                <div className="rightHeader">
                    <img src="" alt="" style={{width:'100%'}} />
                </div>
            </div>
            <div className="gerenNav clearfix">
                <div className={_selectLeft?'gerenNavActive':''}
                      style={{float:"left"}}
                      onClick={()=>dispatch(SelectLeft())}
                  >
                 广场
                </div>
                <div className={_selectLeft?'':'gerenNavActive'}
                  style={{float:"left"}}
                  onClick={()=>dispatch(SelectRight())}
              >
                  朋友圈
                </div>
            </div>
            <div className="aui-refresh-content"
                style={{height:this.state.height,top:this.state.pageMoveY}}
                onTouchStart={(event)=>this.touchstart(event)}
                onTouchMove={(event)=>this.touchmove(event)}
                onTouchEnd={(event)=>this.touchend(event)}
                  >
              <div className="aui-content">
              {_selectLeft?<FriendGroupList list={initChaorenReducers} dianzan={(index)=>this.dianzan(index)}></FriendGroupList>:
              <FriendGroupList list={initFriendReducers} dianzan={(index)=>this.dianzan(index)}></FriendGroupList>}
              </div>
            </div>

        </div>
      </div>
    )
  }
}

function select(state){
  return state
  // return{
  //   _selectLeft:state._selectLeft,
  //   initChaorenReducers:state.initChaorenReducers,
  //   initFriendReducers:state.initFriendReducers
  // }
}


export default connect(select)(App);
