import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
      className={`p-3 rounded-lg mb-4 text-sm ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
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
    try {
      const response = await axios.post(
        `${baseUrl}/transaction`,
        { type: "withdraw" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
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
          message: "Successfully approved this withdrawal",
          type: "success",
        });
        getWithdrawal();
      } else {
        setNotification({
          message: "Withdrawal approval failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      setNotification({
        message: "An error occurred while trying to approve withdrawal.",
        type: "error",
      });
    } finally {
      setIndexLoading(null);
    }
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

    try {
      const response = await axios.post(
        `${baseUrl}/transaction/withdrawal`,
        {
          amount,
          method,
          wallet_address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setNotification({
          message: "Withdrawal request has been made to the administrator",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error creating withdrawal request:", error);
      setNotification({
        message: "Something went wrong while creating withdrawal request.",
        type: "error",
      });
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

  return (
    <div className="space-y-8">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {/* Render the rest of your UI (e.g., form, withdrawal history) */}
    </div>
  );
}
