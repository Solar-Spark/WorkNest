const userService = require("../services/user_service")

getUserDtoById = async (req, res) => {
    try{
        const userDto = await userService.getUserDtoById(req.params.user_id);
        if(userDto){
            return res.status(200).send(userDto);
        }
        else{
            return res.status(404).send("User Not Found");
        }
    } catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

getUserDtoByUsername = async (req, res) => {
    try{
        const userDto = await userService.getUserDtoByUsername(req.params.username);
        if(userDto){
            return res.status(200).send(userDto);
        }
        else{
            return res.status(404).send("User Not Found");
        }
    } catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getUserDtoById,
    getUserDtoByUsername,
    
}