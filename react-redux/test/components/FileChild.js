import React,{Component} from "react";
import {Link} from "react-router";

export default class FileChild extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let {filesList}=this.props;
    let list = filesList.map((item,index)=>{
      return (
        <li data={item.caseMedical.CaseMedicalID} key={index}>
              <div className="myFileListTop clearfix">
                  <p className="myFileListName fl" >
                    {item.caseMedical.Name}
                  </p>
                  <div className="myFileListInfo fl">
                      {item.caseMedical.gender} {item.Age}
                  </div>
              </div>
              <div className="myFileListCenter">
                    {item.caseMedical.Conclusion}
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
