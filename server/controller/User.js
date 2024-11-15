import User from '../model/User.js'

export const GetUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const Signup = async (req, res) => {
    const { username, email, mobilenumber, password, firstname, lastname } = req.body
    try {
        let user = await User.findOne({ email: email });
        if (user) { res.status(200).json({ message: "Account registered" }) }
        else {
            const newUser = new User({
                username,
                email,
                mobilenumber,
                password,
                firstname,
                lastname,
                isAdmin: false
            })
            await newUser.save()
            res.status(201).json({ message: "Account created", user: newUser })
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const Login = async (req, res) => {
    const user = req.body;
    try {
        const userdb = await User.findOne({ email: user.email, password: user.password })
        if (!userdb) return res.status(404).json(false);
        res.status(201).json(userdb);
    } catch (error) {
        res.status(404).json(false);
    }
}

export const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};