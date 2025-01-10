import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";

export default function TransactionsTab() {
  const [transactions, setTransactions] = useState<Investment[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getToken: any = JSON.parse(localStorage.getItem("user") || "{}");
    setToken(getToken.token);
    fetchTransactions(getToken.token);
  }, []);

  const convertToDateFormat = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchTransactions = async (token: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/transaction`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setTransactions(response.data.data);
        setFilteredTransactions(response.data.data); // Initialize filtered transactions
      }
    } catch (error: any) {
      console.error(
        "Error fetching investments:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on the selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((tx) => tx.type === filter);
      setFilteredTransactions(filtered);
    }
  }, [filter, transactions]);

  if (loading) {
    return (
      <div className="space-y-8 text-white">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Investment History
        </h2>
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Your Transactions</CardTitle>
            <CardDescription>
              Track the performance of your Transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>Loading Transactions...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Transactions
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="withdraw">Withdrawal</option>
          <option value="deposit">Deposit</option>
          <option value="earning">Earnings</option>
          <option value="investment">Investments</option>
          {/* <option value="referrals">Referrals</option> */}
        </select>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-white">Your latest account activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-white">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">User</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-gray-700">
                  <td className="py-4">{tx.user && tx.user.name}</td>
                  <td className="py-4">{tx.type}</td>
                  <td
                    className={`py-4 ${tx.group == "credit" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {tx.group === "credit" ? `+${tx.amount}` : `-${tx.amount}`}
                  </td>
                  <td className="py-4">{convertToDateFormat(tx.date)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${tx.status == "1"
                        ? "bg-green-900 text-green-300"
                        : "bg-blue-900 text-blue-300"
                        }`}
                    >
                      {tx.status == "1" ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}