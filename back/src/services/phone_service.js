const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILLIO_ACCOUNT_TOKEN); 
const User = require('../models/user_model');
require('dotenv').config();

notifyCreateTask = async (task) => {
    // try{
    //     const user = await User.findOne({user_id : task.assigned_to});
    //     const {username, phone_number} = user;
    //     twilioClient.messages
    //     .create({
    //         body: `Hello ${username}! You have a new task. ${task.name}. Deadline is ${new Date(task.deadline).toLocaleDateString()}`,
    //         messagingServiceSid: 'MG57f9b57eb184ed02a4f9e71b6589922b',
    //         to: phone_number
    //     })
    //     .then(message => console.log(message.sid));
    // } catch (err){
    //     console.error(err)
    // }
}
sendOTP = async (phone_number, otp) => {
    // try{
    //     twilioClient.messages
    //     .create({
    //         body: `Your authentication code for WorkNest - ${otp}. Don't show it anyone`,
    //         messagingServiceSid: 'MG57f9b57eb184ed02a4f9e71b6589922b',
    //         to: phone_number
    //     })
    //     .then(message => console.log(message.sid));
    // } catch (err){
    //     console.error(err)
    // }
}
module.exports ={
    notifyCreateTask,
    sendOTP,
}