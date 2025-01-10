import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Users, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

export default function DashboardTab() {
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [reflink, setReflink] = useState<string>("");
  const [earningsBreakdown, setEarningsBreakdown] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  // const [cryptoPrices, setCryptoPrices] = useState<{ btc: number; eth: number }>({ btc: 0, eth: 0 });
  const [activeInvestments, setActiveInvestments] = useState<number>(0); // New state
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalWithdraw, setTotalWithdraw] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let username = JSON.parse(localStorage.getItem("user"));
    let refLink = `https://coinsharesmining.com?ref=${username.username}`;
    setReflink(refLink);
  }, []);

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("user") || "{}");
    const token = getToken.token;
    if (token) {
      fetchEarnings(token);
      activeInvestment(token);
      fetchWalletBalance(token); // Fetch wallet balance
      // fetchCryptoPrices(); // Fetch crypto prices
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property
      getUsers();
      getDeposits();
      getWithdrawal();
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reflink);
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 3000);
  };

  const fetchWalletBalance = async (token: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/transaction/wallet`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setWalletBalance(response.data.data); // Assuming API returns { balance: number }
      }
    } catch (error: any) {
      console.error(
        "Error fetching wallet balance:",
        error.response?.data || error.message
      );
    }
  };

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

        const total = earnings.reduce(
          (sum: number, inv: any) => sum + (inv.earning.amount || 0),
          0
        );

        // const activeCount = earnings.filter((inv: any) => inv.status === 0).length;

        setTotalEarnings(total); // Update total earnings
        setEarningsBreakdown(earnings); // Set breakdown
        // setActiveInvestments(activeCount);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  const activeInvestment = async (token: string) => {
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
        const investment = response.data.data;
        console.log("Investment data:", response.data.data);
        // const total = investment.reduce(
        //   (sum: number, inv: any) => sum + (inv.investment.amount || 0),
        //   0
        // );

        const activeCount = investment.filter(
          (inv: any) => inv.investment.status === 0
        ).length;

        // setTotalEarnings(total); // Update total earnings
        // setEarningsBreakdown(earnings); // Set breakdown
        setActiveInvestments(activeCount);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  const getUsers = async () => {
    let getToken: any = JSON.parse(localStorage.getItem('user'))
    await axios.post(`${baseUrl}/user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
          'Content-Type': 'application/json', // Optional, specify content type
        },
      }
    ).then((response) => {
      // console.log(response.data)
      if (response.data.status === 'success') {
        console.log('allUsers', response.data.data)
        setTotalUsers(response.data.data.length);
      }
    }).catch((error) => {
      console.log(error);
      console.error("Error fetching deposits:", error);
    }
    )
  };

  const getDeposits = async () => {
    let getToken: any = JSON.parse(localStorage.getItem('user'))
    await axios.post(`${baseUrl}/transaction`,
      { type: "deposit" },
      {
        headers: {
          Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
          'Content-Type': 'application/json', // Optional, specify content type
        },
      }
    ).then((response) => {
      // console.log(response.data)
      if (response.data.status === 'success') {

        const deposits = response.data.data;
        const total = deposits.reduce(
          (sum: number, inv: any) => sum + (inv.amount || 0),
          0
        );
        setTotalDeposit(total);
      }
    }).catch((error) => {
      console.log(error);
      console.error("Error fetching deposits:", error);
    }
    )
  };

  const getWithdrawal = async () => {
    let getToken: any = JSON.parse(localStorage.getItem('user'))

    let data: any = {
      type: "withdraw",
    }
    await axios.post(
      `${baseUrl}/transaction`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
        }
      },
    )
      .then(function (response: any) {

        if (response.data.status === "success") {
          // console.log("withdrawal:", response.data);

          const withdraws = response.data.data;
          const total = withdraws.reduce(
            (sum: number, inv: any) => sum + (inv.amount || 0),
            0
          )

          setTotalWithdraw(total);

        }
      })
      .catch((error: any) => {
        alert("somthing went wrong ")
        console.error("Error creating withdrwal request:", error);
      })

  }
  return (
    <>
      {!isAdmin && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Dashboard
          </h2>
          <div>
            <span className="text-white font-semibold mb-2">
              Your referral link:
            </span>
            <div className="flex items-center w-full space-x-2">
              <input
                type="text"
                value={reflink}
                readOnly
                className="flex-1 bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                style={{ maxWidth: "70%" }} // Adjust width to reduce the input size
              />
              <Button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white hover:bg-blue-400 rounded-lg px-4 py-2 focus:outline-none"
              >
                Copy
              </Button>
            </div>
          </div>
          {showPopup && (
            <div className="absolute top-0 right-0 mt-4 p-3 bg-green-500 text-white rounded-lg shadow-lg">
              Referral link copied to clipboard!
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-lg text-gray-400">Loading...</div>
                ) : (
                  <div className="text-2xl font-bold text-green-400">
                    ${walletBalance ? walletBalance.toFixed(2) : "0.00"}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Investments
                </CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : activeInvestments}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p className="text-4xl font-bold text-green-400">
                    ${totalEarnings.toFixed(2)}
                  </p>
                )}
                {/* <div className="text-2xl font-bold text-green-400">$12,543.00</div> */}
              </CardContent>
            </Card>
          </div>

        </div>
      )}
      <div className="space-y-8">
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p className="text-4xl font-bold text-green-400">
                    {totalUsers}
                  </p>
                )}
                {/* <div className="text-2xl font-bold text-green-400">$12,543.00</div> */}
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deposit</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p className="text-4xl font-bold text-green-400">
                    ${totalDeposit.toFixed(2)}
                  </p>
                )}
                {/* <div className="text-2xl font-bold text-green-400">$12,543.00</div> */}
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p className="text-4xl font-bold text-green-400">
                    ${totalWithdraw.toFixed(2)}
                  </p>
                )}
                {/* <div className="text-2xl font-bold text-green-400">$12,543.00</div> */}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
