import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { exit } from "process";

// Define the type for investment data

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

export default function WalletAddressTab() {
  const [walletAddress, setWalletAddress] = useState<any[]>([]);
  const [address, setAddress] = useState<string>("");
  const [activeWalletAddress, setActiveWalletAddress] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmittingWalletAddress, setIsSubmittingWalletAddress] = useState<boolean>(false);
  const [isModalOpenWalletAddress, setIsModalOpenWalletAddress] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    fetchWalletAddress()
  }, []);

  const handleUpdateWalletAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address.length == 0) {
      alert("Address field is required")
      return
    }
    setIsSubmittingWalletAddress(true);
    try {
      const token = JSON.parse(localStorage.getItem("user") || "{}").token;

      const response = await axios.post(
        `${baseUrl}/wallet-address/update/${activeWalletAddress}`, // Replace with your endpoint
        {
          address: address, // Send currentPassword and newPassword to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setIsSubmittingWalletAddress(false);
        setNotification({
          message: "Deposit successfully.",
          type: "success",
        });
        setIsModalOpenWalletAddress(false);
        fetchWalletAddress()
      } else {
        setIsSubmittingWalletAddress(false);
      }
    } catch (error: any) {
      setIsSubmittingWalletAddress(false);
    } finally {
      setIsSubmittingWalletAddress(false);
    }
  }
  const updateWalletAddress = async (id: number) => {
    setActiveWalletAddress(id);
    setIsModalOpenWalletAddress(true)
  }
  const fetchWalletAddress = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/wallet-address`);

      if (response.data.status === "success") {
        setLoading(false);
        // const filteredInvestments = response.data.data.map((inv: any) => ({
        //   id: inv.id,
        //   name: inv.name,
        //   minimum_amount: inv.minimum_amount,
        //   maximum_amount: inv.maximum_amount,
        //   duration: inv.duration,
        //   rate: inv.interest_rate || 0,
        // }));

        setWalletAddress(response.data.data);
      } else {
        console.error("Error fetching investments: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    } finally {
      setLoading(false);

    }
  };




  if (loading) {
    return (
      <div className="space-y-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-white">Loading investment packages...</CardContent>
        </Card>
      </div>
    )
  }

  return (


    <div className="space-y-8 text-white">

      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Wallet Address
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {walletAddress.map((wallet: any) => (
          <Card key={wallet.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{wallet.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>{wallet.address}</li>
              </ul>

              <Button className="w-full mt-4" onClick={() => updateWalletAddress(wallet.id)}>
                Update Wallet
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpenWalletAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-64 sm:w-1/2 md:w-3/4 lg:w-1/2 xl:w-112 relative">


            <h3 className="text-lg font-semibold text-white mb-4">
              Update Wallet Address
            </h3>
            <form className="space-y-4" onSubmit={handleUpdateWalletAddress}>
              <div className="space-y-2">
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Enter Address"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpenWalletAddress(false)}
                  className="bg-gray-600 hover:bg-gray-500"
                  disabled={isSubmittingWalletAddress}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-400"
                  disabled={isSubmittingWalletAddress}
                >
                  {isSubmittingWalletAddress ? "Updating..." : "Update wallet Address"}
                </Button>
              </div>
            </form>

          </div>

        </div>
      )}
    </div>
  );
}
