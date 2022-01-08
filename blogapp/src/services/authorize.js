
//เก็บ token / username => session storage
export const authenticate = (response,next) => {
    if(window !=="undefined"){
        //เก็บข้อมูล session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("username",JSON.stringify(response.data.username))
    }
    next()
}

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser=()=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false
        }
    }
}

//logut

export const logout=(next)=>{
    if(window !=="undefined"){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    }
    next();
    }

