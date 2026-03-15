import React, { useState, useEfffect } from "react";
import axios from "axios";
const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const token = localStorage.getItem("token");
    useEfffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:5565/statement", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTransactions(res.data);

            } catch (error) {
                console.log("failed to fetch the transactions")

            }
        };
        fetchTransactions();
    }, [token]);

    return (
        <div>
            <h1>Dashboard</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Balance</th>
                    </tr>

                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td style={{ color: tx.transaction === "credit" ? "green" : "red" }}>{tx.transaction}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.sender}</td>
                            <td>{tx.receiver}</td>
                            <td>{tx.balance_after_transaction}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

module.exports = Dashboard;
