import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";

export default function WithdrawTab() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [methodError, setMethodError] = useState<string | null>(null);

  const stateSetters = {
    amount: setAmount,
    method: setMethod,
    address: setAddress,
  };

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("user") || "{}");
    setToken(getToken.token);
    getWithdrawal();
  }, []);

  const getWithdrawal = async () => {
    const getToken = JSON.parse(localStorage.getItem("user") || "{}");
    const data = { type: "withdraw" };
    await axios
      .post(
        `${baseUrl}/transaction`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setHistory(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching withdrawal history:", error);
      });
  };

  const convertToDateFormat = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const setter = stateSetters[name as keyof typeof stateSetters];
    if (setter) setter(value);
  };

  const validateForm = () => {
    let valid = true;
    if (!amount) {
      setAmountError("Amount is required.");
      valid = false;
    } else {
      setAmountError(null);
    }

    if (!address) {
      setAddressError("Wallet address is required.");
      valid = false;
    } else {
      setAddressError(null);
    }

    if (!method) {
      setMethodError("Cryptocurrency method is required.");
      valid = false;
    } else {
      setMethodError(null);
    }

    return valid;
  };

  const createWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    const data = {
      amount,
      method,
      wallet_address: address,
    };
    await axios
      .post(
        `${baseUrl}/transaction/withdrawal`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setNotification({
            message: "Withdrawal request submitted successfully.",
            type: "success",
          });

          // Hide notification after 3 seconds
          setTimeout(() => {
            setNotification(null);
          }, 3000);

          getWithdrawal();
        }
      })
      .catch((error) => {
        console.error("Error creating withdrawal:", error);
        setNotification({
          message: error.response?.data?.message || "Failed to create withdrawal, Check your Internet connection.",
          type: "error",
        });

        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Withdraw Funds
      </h2>

      {notification && (
        <div
          className={`p-4 rounded-md ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <Card className="bg-gray-800 border-gray-700 text-color-white">
        <CardHeader>
          <CardTitle>Withdrawal Request</CardTitle>
          <CardDescription>
            Enter the amount and choose the cryptocurrency for withdrawal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={createWithdrawal}>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                name="amount"
                value={amount}
                onChange={handleInput}
                className="bg-gray-700 border-gray-600"
              />
              {amountError && <div className="text-red-400 text-sm">{amountError}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={handleInput}
                placeholder="Enter Wallet Address"
                className="bg-gray-700 border-gray-600"
              />
              {addressError && <div className="text-red-400 text-sm">{addressError}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="crypto">Cryptocurrency</Label>
              <select
                id="crypto"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                name="method"
                value={method}
                onChange={handleInput}
              >
                <option value="">Select Cryptocurrency</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
              </select>
              {methodError && <div className="text-red-400 text-sm">{methodError}</div>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Request Withdrawal"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Withdrawal History
      </h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle style={{ color: "white" }}>Recent Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">SN</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Wallet Address</th>
                <th className="pb-4">Crypto Currency</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((tx, i) => (
                <tr key={tx.id} className="border-t border-gray-700">
                  <td className="py-4">{i + 1}</td>
                  <td
                    className={`py-4 ${
                      tx.status === 1 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.amount}
                  </td>
                  <td className="py-4">{convertToDateFormat(tx.withdrawal.created_at)}</td>
                  <td className="py-4">{tx.withdrawal.wallet_address}</td>
                  <td className="py-4">{tx.method}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 1
                          ? "bg-green-900 text-green-300"
                          : "bg-yellow-900 text-yellow-300"
                      }`}
                    >
                      {tx.status === 1 ? "Completed" : "Pending"}
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