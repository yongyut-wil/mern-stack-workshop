import { getUser } from "./services/authorize"
import {Route,Redirect} from "react-router-dom"
// import {useNavigate   } from 'react-router-dom'
// import { useParams } from "react-router"


const AdminRoute = ({component:Component,...rest}) => (

    <Route 
    
        {...rest}
        render={props=>
            getUser() ? 
            (<Component {...props}/>) :
            (<Redirect 
                to={{pathname:"/login",state:{from:props.location}}}
                />
            )
        } 
    />
)

export default AdminRoute