
class MessageModel {
    constructor(parseMessage) {
        this.id = parseMessage.id;
        this.createdAt = parseMessage.get("createdAt");
        this.createdBy = parseMessage.get("createdBy");
        this.title = parseMessage.get("title");
        this.buildingId = parseMessage.get("buildingId");
        this.creatorName = parseMessage.get("creatorName");
    }
}

export default MessageModel;