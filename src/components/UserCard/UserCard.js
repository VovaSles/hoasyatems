import { Card } from "react-bootstrap";




function UserCard(props) {
    const { user } = props;



    return (
        <div >
            <Card>
            <Card.Title className="m-3">name : {user.username}</Card.Title>
                <Card.Body>
                    <Card.Text>Apartment number : {user.apartment}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserCard;