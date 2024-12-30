class UserDto {
    constructor(user) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
        this.phone_number = user.phone_number;
    }
}

module.exports = UserDto;