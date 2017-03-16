const INITIAL_DATA ="INITIAL_DATA";
const MORE_FILELIST="MORE_FILELIST";

function initialData(data){

    return {
      type:INITIAL_DATA,
      data
    }
}

function moreFilesList(data){
    return{
      type:MORE_FILELIST,
      data
    }
}
module.exports={
  INITIAL_DATA:INITIAL_DATA,
  initialData:initialData,
  MORE_FILELIST:MORE_FILELIST,
  moreFilesList:moreFilesList
}
