import React,{Component} from "react";
import {Link} from "react-router";

export default class HomeNav extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    let {number} = this.props;
    return(
      <div className="personalCenter">
          <div className="homeBottomNav">
                <ul className="clearfix">
                    <li id="duanxin" className={number=="one"?"navListBlue":""}>
                      <Link href="/#/file">
                        <div className="">
                          <div className={"navLogoFirst"+" "+(number=="one"?'navLogoFirstActive':"") }>

                          </div>
                          <p className="textNav">
                            档案
                          </p>
                        </div>
                      </Link>


                    </li>
                    <li id="toWeiWang" className={number=="two"?'navListBlue':""}>
                      <Link href="/">
                        <div className="">
                          <div className={"navLogoSecond"+" "+(number=="two"?'navLogoSecondActive':"") }>

                          </div>
                          <p className="textNav">
                          超人圈
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li id="toMore" className={number=="three"?'navListBlue':""}>
                      <div className="">
                        <div className={"navLogoThree"+" "+(number=="three"?"navLogoThreeActive":"")}>

                        </div>
                        <p className="textNav">
                          在线指导
                        </p>
                      </div>
                    </li>
                    <li id="toMy" className={number=="four"?'navListBlue':""}>
                      <div className="">
                        <div className={"navLogoFour"+" "+(number=="four"?"navLogoFourActive":"")}>

                        </div>
                        <p className="textNav">
                        我的
                        </p>
                      </div>
                    </li>
                </ul>
          </div>
      </div>
    )
  }
}
