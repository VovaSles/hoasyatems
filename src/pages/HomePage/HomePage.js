import { Container, Jumbotron } from "react-bootstrap";
import AppNavbr from "../../components/AppNavbar/AppNavbr";



function HomePage(props) {
    const {activeUser, onLogout} = props;

    return (
        <div className="p-home">
            <AppNavbr activeUser={activeUser} onLogout={onLogout}/>
            <Jumbotron>
                <Container>
                    <h1> Welcome to HomeApp</h1>
                </Container>
            </Jumbotron>
           
        </div>
    )

}

export default HomePage;