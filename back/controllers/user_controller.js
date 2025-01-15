const userService = require("../services/user_service")

getUserDtoById = async (req, res) => {
    try{
        const userDto = await userService.getUserDtoById(req.params.user_id);
        if(userDto){
            res.status(200).send(userDto);
        }
        else{
            res.status(404).send("User Not Found");
        }
    } catch(err){
        res.status(500).send("Internal Server Error");
        console.error(err);
    }
}

getUserDtoByUsername = async (req, res) => {
    try{
        const userDto = await userService.getUserDtoByUsername(req.params.username);
        if(userDto){
            res.status(200).send(userDto);
        }
        else{
            res.status(404).send("User Not Found");
        }
    } catch(err){
        res.status(500).send("Internal Server Error");
        console.error(err);
    }
}

module.exports = {
    getUserDtoById,
    getUserDtoByUsername,
    
}