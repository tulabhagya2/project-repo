const supabase = require("../config/supabaseClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All the fields are required."
            })
        }

        const { data: existing } = await supabase.from("users_model").eq("email", email).select().single();
        if (existing) {

            return res.status(409).json({
                status: false,
                message: `Email ${email} is already exists.`
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase.from("users_model").insert({ name: name, email: email, password: hashedPassword, balance: 10000 }).select().single();
        if (error) throw error;
        res.status(201).json({
            status: true,
            message: "user signed in successfully.",
            data
        })

    }


    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })


    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All the fields are required."
            })
        }

        const { data: existing } = await supabase.from("users_model").eq("email", email).select().single();
        if (!existing) {

            return res.status(409).json({
                status: false,
                message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare("password", existing.password);
        if (!isMatch) {

            return res.status(409).json({
                status: false,
                message: "Invalid credentials"
            })

        }

        const token = jwt.sign({ id: existing.id },
            process.env.JWT_SECRET,
            { expiresIn: "1hr" }
        )
        const { data, error } = await supabase.from("users_model").select().single();
        if (error) throw error;
        res.status(201).json({
            status: true,
            message: "user logged in successfully.",
            data,
            token
        })

    }


    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })


    }
}

module.exports = { signup, login }