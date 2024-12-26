class UserDto {
    constructor(user) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
    }
}

module.exports = UserDto;