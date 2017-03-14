import {combineReducers} from "redux";
import actions from "../actions/FriendGroup/friendGroupAction";


const initialState={
  _selectLeft:true,
  initChaorenReducers:[],
  initFriendReducers:[]
}

function friendGroupReducer (state=initialState,action){
  switch (action.type) {
    //选择左边导航
    case actions.Select_Left:
      return Object.assign({},state,{_selectLeft:true});
    //选择右边当行
    case actions.Select_Right:
        return Object.assign({},state,{_selectLeft:false});
    //初始化数据
    case actions.InitChaorenList:
    return Object.assign({},state,{initChaorenReducers:action.data});
    //初始化朋友圈数据
    case actions.InitFriendList:
    return Object.assign({},state,{initFriendReducers:action.data});
    //改变超人圈点赞
    case actions.ChoseLiked:
    return Object.assign({},state,{initChaorenReducers:[
      ...state.initChaorenReducers.slice(0,action.index),
      Object.assign({},state.initChaorenReducers[action.index],{liked:action.isLiked,likerCount:action.number}),
      ...state.initChaorenReducers.slice(action.index + 1)
    ]});
    //改变朋友圈点赞
    case actions.ChoseFriendLiked:
    return Object.assign({},state,{initFriendReducers:[
      ...state.initFriendReducers.slice(0,action.index),
      Object.assign({},state.initFriendReducers[action.index],{liked:action.isLiked,likerCount:action.number}),
      ...state.initFriendReducers.slice(action.index + 1)
    ]});
    //滑动加载
    case actions.GetMoreChaorenList:
    return   Object.assign({},state,{initChaorenReducers:state.initChaorenReducers.concat(action.data)})
    case actions.GetMoreFriendList:
    return   Object.assign({},state,{initFriendReducers:state.initFriendReducers.concat(action.data)})
    default:
      return state
  }
}

// const comFun =combineReducers({
// _selectLeft,
// initChaorenReducers,
// initFriendReducers
// })



export default friendGroupReducer;
