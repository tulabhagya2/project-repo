const supabase = require("../config/supabaseClient");

const dbHealthCheck = async (req, res) => {
    try {
        const { error } = await supabase.from("users_model").select().limit(1);
        if (error) throw error;
        console.log("Database connected successsfully.");
        return true;

    } catch (error) {

        console.log("error occured while connecting to the database", error.message);
        return false
    }
}

module.exports = dbHealthCheck;