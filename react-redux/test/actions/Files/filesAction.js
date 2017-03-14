const INITIAL_DATA ="INITIAL_DATA";

function initialData(data){

    return {
      type:INITIAL_DATA,
      data
    }
}

module.exports={
  INITIAL_DATA:INITIAL_DATA,
  initialData:initialData
}
