
class VotingModel {
    constructor(parseVoting) {
        this.id = parseVoting.id;
        this.createdAt =parseVoting.get("createdAt");
        this.title = parseVoting.get("title");
        this.details = parseVoting.get("details");
        this.buildingId = parseVoting.get("buildingId");
        this.options = parseVoting.get("options");
        this.votes = parseVoting.get("votes");
        this.dueDate = parseVoting.get("dueDate");
    }
}
export default VotingModel;