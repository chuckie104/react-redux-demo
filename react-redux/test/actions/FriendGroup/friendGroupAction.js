//任务选择左边
 const Select_Left ="Select_Left";
//任务选择右边
 const Select_Right = "Select_Right";

//初始化数据超人圈
 const InitChaorenList ="InitChaorenList";
//初始化数据朋友圈
 const InitFriendList ="InitFriendList";
 //改变点赞状态
 const ChoseLiked ="ChoseLiked";
 //改变朋友圈点赞的状态
 const ChoseFriendLiked ="ChoseFriendLiked";
 //加载更多超人圈数据
 const GetMoreChaorenList ="GetMoreChaorenList";
 //
 const GetMoreFriendList ="GetMoreFriendList";

function selectLeft (){

  return {
    type:Select_Left
  }
}


function selectRight(){

  return{
    type:Select_Right
  }
}

function initChaorenList(data){
  return{
    type:InitChaorenList,
    data
  }
}
function initFriendList(data){
  return{
    type:InitFriendList,
    data
  }
}

//点赞
function choseLiked(index,isLiked,number){
  return{
    type:ChoseLiked,
    isLiked,
    index,
    number
  }
}

//点赞朋友圈
function choseFriendLiked(index,isLiked,number){
  return{
    type:ChoseFriendLiked,
    isLiked,
    index,
    number
  }
}

//滑动加载超人圈
function getMoreChaorenList(data){
    return{
      type:GetMoreChaorenList,
      data
    }
}

//滑动加载超人圈
function getMoreFriendList(data){
    return{
      type:GetMoreFriendList,
      data
    }
}

module.exports= {
  Select_Left:Select_Left,
  Select_Right:Select_Right,
  selectLeft:selectLeft,
  selectRight:selectRight,
  InitChaorenList:InitChaorenList,
  InitFriendList:InitFriendList,
  initChaorenList:initChaorenList,
  initFriendList:initFriendList,
  ChoseLiked:ChoseLiked,
  choseLiked:choseLiked,
  ChoseFriendLiked:ChoseFriendLiked,
  choseFriendLiked:choseFriendLiked,
  GetMoreChaorenList:GetMoreChaorenList,
  getMoreChaorenList:getMoreChaorenList,
  GetMoreFriendList:GetMoreFriendList,
  getMoreFriendList:getMoreFriendList
}
