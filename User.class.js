class User {
    constructor(id) {
        this.id = id
        this.stats = {
            solved : [],
            unfinished : []
        }
    }

    checkStats(){
        return this.stats;
    }

    
}

module.exports = User