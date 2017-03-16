import React,{Component} from "react";
import {Link} from "react-router";

export default class FileChild extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let {filesList}=this.props;
    let list = filesList.map((item,index)=>{
      let {Name,Conclusion,Age,Sex,CaseMedicalID} = item.caseMedical;
      if(Name==undefined||Name==""){
        Name="姓名无";
      }
      if(Conclusion==undefined||Conclusion==""){
        Conclusion="超声提示无";
      }
      if(Age==undefined||Age==""){
        Age="";
      }else{
        Age=Age+"岁";
      }
      if(Sex==0){
          Sex="男";
      }else if(Sex==1){
          Sex="女";
      }else if(Sex==2){
        Sex="未知";
      }
      return (
        <li data={CaseMedicalID} key={index}>
              <div className="myFileListTop clearfix">
                  <p className="myFileListName fl" >
                    {Name}
                  </p>
                  <div className="myFileListInfo fl">
                      {Sex} {Age}
                  </div>
              </div>
              <div className="myFileListCenter">
                    {Conclusion}
              </div>
              <div className="myFileListBot">
                  {item.caseMedical.CreateDate} 创建
              </div>
          </li>);
    })
    return(
      <ul className="clearfix" id="myFileContent">
          {list}
      </ul>
    )
  }
}
