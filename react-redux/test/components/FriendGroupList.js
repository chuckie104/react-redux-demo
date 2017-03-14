import React,{Component} from "react";




export default class FriendGroupList extends Component{
  constructor(props){
      super(props);
  }
  render(){

    const {list} =this.props;

     let fList = list.map((item,index)=>{
     return (<li className="fl" key={index}>
            <div className="touxiang_logo fl">
                  <img src={"http://cloud.siui.com/"+item.vForum.Avatar} alt="" />
            </div>
            <div className="fgContent fl" >
                  <div className="friendGroup_name">
                      {item.vForum.Nickname}
                  </div>
                  <div className="friendGroup_info">
                      {item.vForum.CustomTitle}
                  </div>
                  <div className="huanzhe_info">
                      {item.vForum.CustomDescription}
                  </div>
                  <div className="imgvideo clearfix">
                    {item.forumFilesURL.map((ell,key)=>{
                      return (<section key={key}>
                                <img src={ell} alt=""/>
                            </section>)
                    })}
                  </div>
                  <div className="friendGroup_bottom clearfix">
                      <div className="fl friendGroup_time">
                          {item.vForum.CreateTime}
                      </div>
                      <div className="fr friendGroup_userControl ">
                          <div className="fl deleteFG ">
                                    删除
                          </div>
                          <div className="fl" >
                              <div className={"fl "+(item.liked?'aixinLogoActive':"aixinLogo")}
                                    onClick={()=>this.props.dianzan(index)}                    >
                              </div>
                              <div className="aixinText fl">
                                  {item.likerCount}
                              </div>
                          </div>
                          <div className="fl" style={{marginLeft:'.2rem'}}>
                            <div className="dianzanLogo fl">

                            </div>
                            <div className="dianzanText fl">
                                  {item.commentCount}
                            </div>
                          </div>
                      </div>
                  </div>
            </div>
          </li>);
    })

    return(
      <div className="friendGroup_content">
        <ul className="clearfix" id="friendGroup_content">
            {fList}
        </ul>
      </div>
    
    )
  }
}
