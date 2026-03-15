const supabase=require("../config/supabaseClient");
const getStatement=async(req,res)=>{
    const userId=req.user.id;
    const {data,error}=await supabase.from("transactions").select()
}