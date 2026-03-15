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
        const statement = allTransactions.map((tx) => {
            if (tx.transaction_type == "credit" && tx.receiver_id == userId) {
                balance = balance + tx.amount;
            }
            if (tx.transaction_type == "debit" && tx.sender_id == userId) {
                balance = balance - tx.amount;
            }
        })
        return {
            id: tx.id,
            date: tx.created_at,
            transaction: tx.transaction_type,
            amount: tx.amount,
            sender: tx.sender_id,
            receiver: tx.receiver_id,
            balance_after_transaction: balance

        }

        res.status(200).json(statement)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
const sendMoney = async (req, res) => {
    const senderId = req.user.id;
    const { receiver_email, amount } = req.body;
    try {
        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount should be greter than zero"
            })
        }
        const senderResult = await supabase.from("users_model").select("*").eq("id", senderId).single();
        const sender = senderResult.data;
        if (senderResult.error) {
            return res.status(400).json({
                message: "error"
            })
        }
        const receiverResult = await supabase.from("users_model").select("*").eq("email", receiver_email).single();
        const receiver = receiverResult.data;
        if (!receiver || receiverResult.error) {
            return res.status(400).json({
                error: "Receiver not found"
            })
        }
        if (sender.balance < amount) {
            return res.status(400).json({
                error: "Insufficient balance"
            });
        }
        await supabase.from("users_model").update({ balance: sender.balance + amount }).eq("id", receiver.id);
        await supabase.from("transactions").insert([{ sender_id: senderId, receiver_id: receiver.id, amount, transaction_type: "debit" },
        {
            sender_id: senderId,
            receiver_id: receiver.id, amount,
            transaction_type: "credit"
        }
        ]);
        res.status(200).json({
            message: "Money sent successfully"
        })
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

module.exports = { getStatement, sendMoney }