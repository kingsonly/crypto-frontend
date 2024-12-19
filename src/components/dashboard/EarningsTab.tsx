import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function EarningsTab() {
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [earningsBreakdown, setEarningsBreakdown] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("user") || "{}");
    const token = getToken.token;
    if (token) {
      fetchEarnings(token);
    }
  }, []);

  const fetchEarnings = async (token: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/transaction`,
        { type: "earning" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const earnings = response.data.data;
        // Calculate total expected earnings
        const total = earnings.reduce(
          (sum: number, inv: any) => sum + (inv.earning.amount || 0),
          0
        );

        setTotalEarnings(total); // Update total earnings
        setEarningsBreakdown(earnings); // Set breakdown
      }
    } catch (error: any) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Earnings
      </h2>
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-4xl font-bold text-green-400">
              ${totalEarnings.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : earningsBreakdown.length > 0 ? (
            <table className="w-full text-white">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">SN</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {earningsBreakdown.map((inv: any, index) => (
                  <tr key={inv.id} className="border-t border-gray-700">
                    <td className="py-4">{index+1}</td>
                    <td className="py-4 text-green-400">+${inv.earning.amount}</td>
                    <td className="py-4 text-green-400">
                    {new Date(inv.earning.created_at).toISOString().split("T")[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You have no completed investments yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}