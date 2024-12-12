import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Define the type for investment data
interface Investment {
  id: number;
  name: string;
  minimum_amount: number;
  maximum_amount: number;
  duration: string;
  monthlyProfit: number;
}

export default function PackagesTab() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [investButtonLoading, setInvestButtonLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(""); 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number | string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const getToken = JSON.parse(storedUser);
      setToken(getToken.token);
      fetchInvestments(getToken.token);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchInvestments = async (token: string) => {
    try {
      const response = await axios.get(`${baseUrl}/package`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { type: "investment" },
      });

      if (response.data.status === "success") {
        const filteredInvestments = response.data.data.map((inv: any) => ({
          id: inv.id,
          name: inv.name,
          minimum_amount: inv.minimum_amount,
          maximum_amount: inv.maximum_amount,
          duration: inv.duration,
          monthlyProfit: inv.monthlyProfit || 0,
        }));

        setInvestments(filteredInvestments);
      } else {
        console.error("Error fetching investments: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestNow = (inv: Investment) => {
    setSelectedInvestment(inv);
    setShowModal(true);
    setSuccessMessage(null)
  };

  const handleModalClose = () => {
    setShowModal(false);
    setInvestmentAmount("");
    setError(null); // Clear error when modal is closed
    setSuccessMessage(null); // Clear success message
  };

  const handleInvestSubmit = async () => {
    if (!investmentAmount || investmentAmount.toString().trim() === "") {
      setError("Please enter an amount.");
      return;
    }

    if (selectedInvestment && investmentAmount) {
      const amount = parseFloat(investmentAmount.toString());

      if (amount < selectedInvestment.minimum_amount || amount > selectedInvestment.maximum_amount) {
        setError(`Amount must be between ${selectedInvestment.minimum_amount} and ${selectedInvestment.maximum_amount}`);
        return;
      }

      setInvestButtonLoading(true);

      const investmentData = {
        package_id: selectedInvestment.id,
        amount,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/transaction/create-investment`,
          investmentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.data.status === "success") {
          setSuccessMessage(response.data.message || "Investment successful!");
          setError(null);
          setTimeout(() => {
            setSuccessMessage(null)
            handleModalClose(); // Close the modal after displaying success
          }, 2000);
        } else {
          setError(response.data.message || "An error occurred.");
        }
      } catch (error: any) {
        if (!error.response) {
          setError("Network error: Please check your internet connection.");
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while processing your investment.");
        }
      } finally {
        setInvestButtonLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 text-white">
          Investment History
        </h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-white">Loading investments...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Investment History
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <Card key={inv.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{inv.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>Minimum Amount: {inv.minimum_amount}</li>
                <li>Maximum Amount: {inv.maximum_amount}</li>
                <li>Duration: {inv.duration}</li>
                <li>Monthly Profit: {inv.monthlyProfit}</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => handleInvestNow(inv)}>
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-[450px] relative">
            <div
              className="absolute top-2 right-2 text-white text-3xl cursor-pointer"
              onClick={handleModalClose}
            >
              &times;
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Invest in {selectedInvestment?.name}
            </h3>
            {successMessage && (
              <div className="bg-green-500 text-white p-2 rounded-lg mb-4">
                {successMessage}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className="text-white block mb-3">Enter your expected amount</label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={selectedInvestment?.minimum_amount}
                  max={selectedInvestment?.maximum_amount}
                  placeholder={`Min: ${selectedInvestment?.minimum_amount} Max: ${selectedInvestment?.maximum_amount}`}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-between space-x-6">
                <Button onClick={handleInvestSubmit} className="w-full" disabled={investButtonLoading}>
                  {investButtonLoading ? "Processing..." : "Invest"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
