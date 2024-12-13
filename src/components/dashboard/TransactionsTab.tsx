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
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getToken: any = JSON.parse(localStorage.getItem("user") || "{}");
    setToken(getToken.token);
    fetchTransactions(getToken.token);
  }, []);

  const convertToDateFormat = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
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
  if (loading) {
    return (
      <div className="space-y-8 text-white">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Investment History
        </h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Your Transactionss</CardTitle>
            <CardDescription>
              Track the performance of your Transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>Loading Transactions...</CardContent>
        </Card>
      </div>
    );
  }
  console.log(transactions);
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Transactions
      </h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest account activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-white">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Type</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-gray-700">
                  <td className="py-4">{tx.type}</td>
                  <td
                    className={`py-4 ${
                      tx.group == "credit" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.group === "credit" ? `+${tx.amount}` : `-${tx.amount}`}
                  </td>
                  <td className="py-4">{convertToDateFormat(tx.date)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status == "1"
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
