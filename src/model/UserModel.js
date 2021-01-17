
class UserModel {
    constructor(parseUser) {
        this.id = parseUser.id;
        this.username = parseUser.get("username");
        this.email = parseUser.get("email");
        this.buildingId = parseUser.get("buildingId");
        this.isAdmin = parseUser.get("isAdmin");
        this.apartment = parseUser.get("apartment");
    }
}

export default UserModel;