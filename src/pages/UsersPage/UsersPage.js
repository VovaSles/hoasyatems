import AppNavbr from "../../components/AppNavbar/AppNavbr";
import { Redirect } from "react-router-dom";



function UsersPage(props) {
    const {activeUser, onLogout} = props;
  
if (!activeUser) {
    return <Redirect to="/"/>
} 


    return (
        <div>
             <AppNavbr activeUser={activeUser} onLogout={onLogout}/>
            <h1>Welcome:</h1>
            <p>{activeUser.name}</p>   
            
        </div>
    )
}

export default UsersPage
