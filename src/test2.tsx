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

export default function InvestmentHistoryTab() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [investButtonLoading, setInvestButtonLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number | string>("");
  const [error, setError] = useState<string | null>(null); // Error state
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
  };

  const handleModalClose = () => {
    setShowModal(false);
    setInvestmentAmount("");
    setError(null); // Clear error when modal is closed
  };

  const handleInvestSubmit = async () => {
    if (!investmentAmount || investmentAmount.toString().trim() === "") {
      setError("Please enter an amount.");
      return; // Exit early if the input is empty
    }
    
    if (selectedInvestment && investmentAmount) {
      const amount = parseFloat(investmentAmount.toString());

      if (amount < selectedInvestment.minimum_amount || amount > selectedInvestment.maximum_amount) {
        setError(`Amount must be between ${selectedInvestment.minimum_amount} and ${selectedInvestment.maximum_amount}`);
        return; // Exit early if validation fails
      }
      
      setInvestButtonLoading(true); // Set button loading state to true when the process starts
      

      const investmentData = {
        investmentId: selectedInvestment.id,
        amount,
        token,
      };

      await axios.post(`${ baseUrl }/transaction/create-investment`,investmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
            'Content-Type': 'application/json', // Optional, specify content type
          },
        }
      ).then((response) => {
        console.log(response.data)
        if (response.data.status === 'success') {
          setError(response.data.message || "An error occurred.");
          handleModalClose();

          return; 
        
        } else {
          console.error("Error investing:", response.data.message);
          setError(response.data.message); // Show error message from backend
        }
    
      }).catch((error) => {
                setError("An error occurred while processing your investment.");
         
         if (!error.response) {
          setError('Network error: Please check your internet connection.');
        } else {
          
          // Display API error messages if available
          if (error.response.data.message) {
            setError(
              Array.isArray(error.response.data.message)
                ? error.response.data.message.join(", ") // Combine array messages
                : error.response.data.message
            );
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        }
        
      }
      ).finally(() => {
        setInvestButtonLoading(false); // Turn off the button's loading state
        });
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

      {/* Modal */}
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








// try {
//     const response = await axios.post(`${baseUrl}/transaction`, {
//       headers: {
//         Authorization: `Bearer ${getToken.token}`,
//         "Content-Type": "application/json",
//       },
//       params: { type: "investment" }, // Optional, depending on the server's API
//     });

//     // Log the response data structure
//     console.log("Response Data:", response.data);

//     if (response.data.status === "success") {
//       // Filter the response data to include only the relevant fields
//       const filteredInvestments = response.data.data.map((inv: any) => ({
//         id: inv.id,
//         amount: inv.amount,
//         created_at: inv.created_at,
//         status: inv.status,
//       }));

//       setInvestments(filteredInvestments); // Store the filtered data
//       console.log("Filtered investments:", filteredInvestments);
//     } else {
//       console.error("Error fetching investments: ", response.data.message);
//     }
//   } catch (error) {
//     console.error("Error fetching investments:", error);
//     console.log(token)
//   } finally {
//     setLoading(false);
//   }