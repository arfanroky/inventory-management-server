const People = require('../models/peopleSchema');

const forgotPassController = async (req, res) => {
    try {
        const {email} = req.body;
        // check email
        const findUser = await People.findOne({email: email})
        if(!findUser){
            return res.status(500).send({
                error: 'This email is not registered in our system!'
            })
        }
        
    } catch (error) {
        
    }

}

module.exports = forgotPassController;