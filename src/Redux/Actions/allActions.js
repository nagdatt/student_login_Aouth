//For changing Navbar Header text
export const changeHeaderText=(text)=>{
    return {type:"change",
            text:text}
}
//For accessing user Data globally

export const USER_DATA=(userData)=>{
        return {
                type:"userData",
                userData:userData
        }
}


  
