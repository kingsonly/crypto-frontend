import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";


export default function InvestmentHistoryTab() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getToken: any = JSON.parse(localStorage.getItem("user") || "{}");
    setToken(getToken.token);
    fetchInvestments(getToken.token);
  }, []);

  const fetchInvestments = async (token: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/transaction`,
        { type: "investment" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setInvestments(response.data.data);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const render = () => {
    if (loading) {
      return (
        <tr>
          <td colspan='6'>loading...</td>
        </tr>
      );
    }
    if(investments.length < 1) {
      return (
        <tr>
          <td colspan='6'>You have no investment history.</td>
        </tr>
      );
    }
    return(
        
      investments.map((inv) => {
        return (
          <tr key={inv.id} className="border-t border-gray-700">
            <td className="py-4">{inv.investment.package}</td>{" "}
            {/* Display Package ID or name */}
            <td className="py-4">{inv.investment.amount}</td>
            <td className="py-4">{inv.investment.start_date}</td>{" "}
            {/* Display the formatted start date */}
            <td className="py-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  inv.investment.status == "1"
                    ? "bg-green-900 text-green-300"
                    : "bg-blue-900 text-blue-300"
                }`}
              >
                {inv.investment.status == "1" ? "Completed" : "in progress"}
              </span>
            </td>
            <td className="py-4">{inv.investment.earning_sum}</td>
          </tr>
        );
      })
    
    )
    
  };

 
  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Investment History
      </h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>
            Track the performance of your investments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-white">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Package</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th> {/* Display Start Date */}
                <th className="pb-4">Status</th>
                <th className="pb-4">Earning</th>
              </tr>
            </thead>
            <tbody>
              {render()}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
