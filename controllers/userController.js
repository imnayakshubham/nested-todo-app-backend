import User from "../Schema/UserSchema.js";
import generateToken from "../utils/generateToken.js";


const register = async (req, res) => {
    const { email_id, password, profilepic } = req.body;
    const emailexists = await User.findOne({ email_id });

    if (!email_id || !password) {
        return res.status(200).json({ message: "Please Fill all the details", status: "Failed" });
    }

    if (emailexists) {
        return res.status(200).json({ message: "Email already exists!", status: "Failed" });
    }
    try {
        const user = await new User({
            email_id,
            password,
            profile_pic: profilepic,
        });
        const result = await user.save();

        if (result) {
            return res.status(200).json({
                message: "Registration Successfully.Welcome!!", status: "Success", result: {
                    ...result._doc,
                    token: generateToken(result._id),
                }
            });
        }
    } catch (error) {
        return res.status(200).json({ message: error, status: "Failed" });
    }
};

const login = async (req, res) => {
    const { email_id, password } = req.body;
    const user = await User.findOne({ email_id });
    try {
        if (!email_id || !password) {
            return res.status(404).json({ message: "Please Fill all the details" });
        }
        if (user && (user.password === password)) {
            res.status(200).json({
                message: "Successfully Logged In", status: "Success",
                result: {
                    id: user._id,
                    location: user?.location ?? "",
                    email_id: user.email_id,
                    token: generateToken(user._id),
                    profile_pic: user.profile_pic,
                }
            });
        } else {
            return res.status(200).json({ message: "Invalid Credentials", status: "Failed" });
        }
    } catch (error) {
        return res.status(200).json({ message: "Something went Wrong", status: "Failed" });
    }
};

export { register, login };