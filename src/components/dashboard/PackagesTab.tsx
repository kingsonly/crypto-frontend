import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { exit } from "process";

// Define the type for investment data
interface Investment {
  id: number;
  name: string;
  minimum_amount: number;
  maximum_amount: number;
  duration: string;
  monthlyProfit: number;
}

function Notification({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`p-3 rounded-lg mb-4 text-sm ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {message}
    </div>
  );
}

export default function PackagesTab() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newLoading, setNewLoading] = useState<boolean>(false);
  const [investButtonLoading, setInvestButtonLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(""); 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number | string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [indexLoading, setIndexLoading] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [fullNotification, setFullNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [name, setName] = useState<string>("");
  const [minimumAmount, setMinimumAmount] = useState<number>(null);
  const [maximumAmount, setMaximumAmount] = useState<number>(null);
  const [interestRate, setInterestRate] = useState<number>(null);
  const [duration, setDuration] = useState<number>(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const stateSetters = {
    name: setName,
    minimumAmount: setMinimumAmount,
    maximumAmount: setMaximumAmount,
    interestRate: setInterestRate,
    duration: setDuration,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const getToken = JSON.parse(storedUser);
      setToken(getToken.token);
      fetchInvestments(getToken.token);
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property
      
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
        console.log("All Packages", response.data);
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

  const createPackage = async (e: React.FormEvent) => {
    e.preventDefault();

    setNewLoading(true)

    if (name == "") {
      setNotification({
        message:
          "Name field is required",
        type: "error",
      });
      setNewLoading(false)
      return;
    }

    if (minimumAmount == null || !minimumAmount) {
      setNotification({
        message:
          "The Minimum Amount field is required",
        type: "error",
      });
      setNewLoading(false)
      return;
    }

    if (maximumAmount == null || !maximumAmount) {
      setNotification({
        message:
          "The Maximum Amount field is required",
        type: "error",
      });
      setNewLoading(false)
      return;
    }

    if (interestRate == null || !interestRate) {
      setNotification({
        message:
          "The Interest Rate field is required",
        type: "error",
      });
      setNewLoading(false)
      return;
    }

    if (duration == null || !duration) {
      setNotification({
        message:
          "The Duration field is required",
        type: "error",
      });
      setNewLoading(false)
      return;
    }

    let data:any = {
      name: name,
      minimum_amount: minimumAmount,
      maximum_amount: maximumAmount,
      interest_rate: interestRate,
      duration: duration,
    }
    
    setNotification(null);
    await axios.post(
      `${ baseUrl }/package/create`, 
      data,
     { headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token in headers
        'Content-Type': 'application/json', // Optional, specify content type
      }},
      )
    .then(function (response:any) {
      if(response.data.status === "success")
      alert("Package Created Successfully")
      setFullNotification({
        message: "Package Created Successfully",
        type: "success",
      })
      fetchInvestments(token);
      setNewLoading(false)
    })
    .catch((error:any) => {
      alert("somthing went wrong ")
      console.error("Error creating withdrwal request:", error);
      setFullNotification({
        message: "Something went wrong, couldn't create package",
        type: "success",
      })
      setNewLoading(false)
    })
    .finally(() => {
      setFullNotification(null);
      setName("")
      setMaximumAmount(null)
      setMinimumAmount(null)
      setInterestRate(null)
      setDuration(null)
      setNewLoading(false)
    })
  }

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

  const handleInput = (e, stateSetters) => {
    const { name, value } = e.target;
  
    if (stateSetters[name]) {
      stateSetters[name](value); // Call the appropriate state setter with the new value
    } else {
      console.warn(`No setter found for input field: ${name}`);
    }
  };

  if (loading) {
    if (isAdmin == 1) {
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
    } else {
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
  }

  return (

   
    <div className="space-y-8 text-white">

    {fullNotification && (
      <Notification
        message={fullNotification.message}
        type={fullNotification.type}
      />
    )}

    {isAdmin && (
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
          Create A New Investment Package
        </h2>
        <Card className="bg-gray-800 border-gray-700 text-color-white">
          <CardHeader>
            <CardTitle>Create A New Package</CardTitle>
            <CardDescription>
              Enter Pakage details
            </CardDescription>
          </CardHeader>
          <CardContent>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
            <form className="space-y-4" onSubmit={createPackage}>
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Package Name"
                  name="name"
            value={name}
            onChange={(e) => handleInput(e, stateSetters)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              {/* Minimum Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="minimumAmount">Minimum Amount</Label>
                <Input
                  id="minimumAmount"
                  type="number"
                  name="minimumAmount"
            value={minimumAmount}
            onChange={(e) => handleInput(e, stateSetters)}
                  placeholder="Enter Minimum Amount"
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              {/* Maximum Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="maximumAmount">Maximum Amount</Label>
                <Input
                  id="maximumAmount"
                  type="number"
                  name="maximumAmount"
            value={maximumAmount}
            onChange={(e) => handleInput(e, stateSetters)}
                  placeholder="Enter Maximum Amount"
                  className="bg-gray-700 border-gray-600"
                />
              </div> 

              {/* Interest Rate Input */}
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate</Label>
                <Input
                  id="interestRate"
                  type="number"
                  name="interestRate"
            value={interestRate}
            onChange={(e) => handleInput(e, stateSetters)}
                  placeholder="Enter Interest Rate"
                  className="bg-gray-700 border-gray-600"
                />
              </div> 

              {/* Maximum Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  name="duration"
            value={duration}
            onChange={(e) => handleInput(e, stateSetters)}
                  placeholder="Enter duration"
                  className="bg-gray-700 border-gray-600"
                />
              </div> 
              
              <Button  type="submit" className="w-full">{newLoading ? "Processing..." : "Create Package"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )}

      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Investment Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <Card key={inv.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">{inv.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-2">
                <li>Minimum Amount: ${inv.minimum_amount}</li>
                <li>Maximum Amount: ${inv.maximum_amount}</li>
                <li>Duration: {inv.duration}</li>
                <li>Monthly Profit: ${inv.monthlyProfit}</li>
              </ul>
              {!isAdmin && (
                <Button className="w-full mt-4" onClick={() => handleInvestNow(inv)}>
                  Invest Now
                </Button>
              )}
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
                  placeholder={`Min: $${selectedInvestment?.minimum_amount} Max: $${selectedInvestment?.maximum_amount}`}
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
