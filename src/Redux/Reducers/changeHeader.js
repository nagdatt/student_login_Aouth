const initialState="Home";
const change=(state=initialState,action)=>{
    console.log(action)
    if(action.type==="change"){
        return action.text
    }
    
    return state
}

export default change;
