import actions from "../../actions/Files/filesAction";

const initialState={
    filesList:[]
}

function filesReducer(state=initialState,action){

      switch (action.type) {
        case actions.INITIAL_DATA:
          return Object.assign({},state,{filesList:action.data})
        default:
        return state
      }
}

export default filesReducer
