import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";

function Notification({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`p-3 rounded-lg mb-4 text-sm ${type === "success"
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
        }`}
    >
      {message}
    </div>
  );
}

export default function WithdrawTab() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [methodError, setMethodError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const stateSetters = {
    amount: setAmount,
    method: setMethod,
    address: setAddress,
  };

  useEffect(() => {
    const getToken: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (getToken && getToken.token) {
      setToken(getToken.token);
      setIsAdmin(getToken.is_admin || false);
    }
    getWithdrawal();
  }, []);

  const getWithdrawal = async () => {
    const data = { type: "withdraw" };
    try {
      const response = await axios.post(`${baseUrl}/transaction`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === "success") {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    }
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
    if (!validateForm()) return;

    setLoading(true);
    const data = {
      amount,
      method,
      wallet_address: address,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/transaction/withdrawal`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setNotification({
          message: "Withdrawal request submitted successfully.",
          type: "success",
        });
        getWithdrawal();
      }
    } catch (error: any) {
      setNotification({
        message: error.response?.data?.message || "Failed to create withdrawal.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const approveWithdrawal = async (withdrawId: number) => {
    setIndexLoading(withdrawId);
    try {
      const response = await axios.get(
        `${baseUrl}/transaction/approve-withdrawal/${withdrawId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setNotification({
          message: "Successfully approved this withdrawal.",
          type: "success",
        });
        getWithdrawal();
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while approving the withdrawal.",
        type: "error",
      });
    } finally {
      setIndexLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {notification && <Notification {...notification} />}
      {!isAdmin && (
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
                {amountError && <div className="text-red-400">{amountError}</div>}
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
                {addressError && <div className="text-red-400">{addressError}</div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="crypto">Cryptocurrency</Label>
                <select
                  id="crypto"
                  className="w-full p-2 bg-gray-700 border-gray-600 rounded-md"
                  name="method"
                  value={method}
                  onChange={handleInput}
                >
                  <option value="">Select Cryptocurrency</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                </select>
                {methodError && <div className="text-red-400">{methodError}</div>}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Request Withdrawal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      {isAdmin && (
        <div>
          <h2 className="text-3xl font-bold">Withdrawal Requests</h2>
          {history.map((item, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <div>{convertToDateFormat(item.date)}</div>
              <Button
                onClick={() => approveWithdrawal(item.id)}
                disabled={indexLoading === item.id}
              >
                {indexLoading === item.id ? "Approving..." : "Approve"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
