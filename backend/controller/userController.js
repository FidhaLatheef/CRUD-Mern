var userModel = require('../model/userModel');
var asyncHandler = require("express-async-handler")

exports.register = asyncHandler(async (req, res) => {
console.log('hii')
    const { name, address, password,mobile} = req.body;
    console.log(req.body)
    const imagePath = req.file.path;
    if (!name || !address || !password) {
        return res.status(400).json({ fieldRequired: true, message: 'Please enter all the fields' });
    }
    else {
        const userExist = await userModel.findOne({ name: req.body.name })
        if (userExist) {
            res.status(400).json({ exist: 'user already exist' })
        }
        else {
            try {
                let user = await userModel.create({
                    name: name,
                    address: address,
                    password: password,
                    mobile:mobile,
                    image: imagePath,
                });
                console.log(user)
                res.status(200).json({ fieldRequired: false, message: 'user created' });

            } catch (err) {
                console.log('Error in creating user', err);
                res.status(500).json({ fieldRequired: false, message: 'Error creating user' });
            }

        }
    }
})
exports.userList = asyncHandler(async (req, res) => {
    try {
        let users = await userModel.find();
        res.send(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error fetching users', error: error });
    }

})