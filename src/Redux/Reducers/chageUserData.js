
const chageUserData=(state=[],action)=>{
    console.log('change user Data')
    console.log(action)
  
     if(action.type==="userData"){
        return action.userData
    }
    return state
}
export default chageUserData;