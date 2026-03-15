const supabase = require("../config/supabaseClient");
const getStatement = async (req, res) => {
    const userId = req.user.id;
    try {
        const { data: sent, error: senterror } = await supabase.from("transactions").select("*").eq("sender_id", userId);
        if (senterror) {
            return res.status(400).json({
                error: senterror.message
            })
        }
        const { data: received, error: receivederror } = await supabase.from("transactions").select("*").eq("receiver_id", userId);
        if (receivederror) {
            return res.status(400).json({
                error: receivederror.message
            });
        }
        const allTransactions = [...sent, ...received];
        allTransactions.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        let balance = 10000;
        const statement = allTransactions.map((tx)=>{
            if(tx.transaction_type=="credit" && tx.receiver_id==userId){
                balance = balance+tx.amount;
            }
            if(tx.transaction_type=="debit" && tx.sender_id==userId){
                balance = balance-tx.amount;
            }
        })
        return {
            id:tx.id,
            date:tx.created_at,
            transaction:tx.transaction_type,
            amount:tx.amount,
            sender:tx.sender_id,
            receiver:tx.receiver_id,
            balance_after_transaction:balance

        }
     }
     res.status(200).json({
        messa
     })
    } catch (error) {
        res.status(500).json({message:error.message})

    }
};
