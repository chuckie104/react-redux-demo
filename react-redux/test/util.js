
import $ from "jquery";
const util={
  ajax(url,json,type) {
    var promise =new Promise(function (resolve,reject){
      $.ajax({
        url: url,
        type: type,
        headers:{"customToken":'a6566c0d5a524942b476e8ca29d65334',"Content-Type":"application/json;charset=UTF-8"},
        data:json,
        success:function(data){
          resolve(data);
            // alert(data);
        },error:function(data){
          reject(data)
        }
      })
    })
    return promise;
  },
  rem(){
    return document.documentElement.clientWidth/7.5;
  }
}



export default util
