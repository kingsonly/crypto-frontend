import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState,useEffect } from "react";

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

export default function WithdrawTab() {
  const baseUrl = import.meta.env.VITE_API_URL
  const [amount,setAmount] = useState<string>();
  const [address,setAddress] = useState<string>();
  const [method,setMethod] = useState<string>();
  const [token,setToken] = useState<string>();
  const [history,setHistory] = useState<any>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const stateSetters = {
    amount: setAmount,
    method: setMethod,
    address: setAddress,
  };

  useEffect(()=> {
    let getToken:any = JSON.parse(localStorage.getItem('user'))
    if (getToken && getToken.token) {
      setToken(getToken.token)
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property
    }
    getWithdrawal();
  },[])

  const getWithdrawal = async () => {
    let getToken:any = JSON.parse(localStorage.getItem('user'))

    let data:any = {
      type:"withdraw",
      
    }
    await axios.post(
      `${ baseUrl }/transaction`, 
      data,
     { headers: {
        Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
      }},
      )
    .then(function (response:any) {
      if(response.data.status === "success")
        console.log("withdrawal:", response.data);
        setHistory(response.data.data)
    })
    .catch((error:any) => {
      alert("somthing went wrong ")
      console.error("Error creating withdrwal request:", error);
    })
   
  } 

  const approveWithdrawal = async (withdrawId: number) => {
    setIndexLoading(withdrawId);

    await axios.get(`${ baseUrl }/transaction/approve-withdrawal/${withdrawId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
          'Content-Type': 'application/json', // Optional, specify content type
        },
      }
    ).then((response) => {
      console.log(response.data)
      if(response.data.status ==='success') {
        setNotification({
            message:
              "Successfully approved this withdrawal",
            type: "success",
          });
  
          setIndexLoading(null);
          getWithdrawal();
      }else {
        setNotification({
          message: "Withdrawal approval failed. Please try again.",
          type: "error",
        });
      }

    }).catch((error) => {
       console.log(error);
       console.error("Error approving deposit:", error);
      setNotification({
        message: "An error occurred while trying to approve withdrawal.",
        type: "error",
      });
    }
    ).finally(() => {
        setIndexLoading(null); // Ensure loading state is turned off
      });
  };
  
  const convertToDateFormat = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  const handleInput = (e, stateSetters) => {
    const { name, value } = e.target;
  
    if (stateSetters[name]) {
      stateSetters[name](value); // Call the appropriate state setter with the new value
    } else {
      console.warn(`No setter found for input field: ${name}`);
    }
  };
  const createWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    let data:any = {
      amount:amount,
      method:method,
      wallet_address:address,
    }

   
    await axios.post(
      `${ baseUrl }/transaction/withdrawal`, 
      data,
     { headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token in headers
        'Content-Type': 'application/json', // Optional, specify content type
      }},
      )
    .then(function (response:any) {
      if(response.data.status === "success")
      alert("withdrawal request has been made to the administrator")
    })
    .catch((error:any) => {
      alert("somthing went wrong ")
      console.error("Error creating withdrwal request:", error);
    })
   
  } 
  return (
    <div className="space-y-8">
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
        />
      )}
      {!isAdmin && (
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
            Withdraw Funds
          </h2>
          <Card className="bg-gray-800 border-gray-700 text-color-white">
            <CardHeader>
              <CardTitle>Withdrawal Request</CardTitle>
              <CardDescription>
                Enter the amount and choose the cryptocurrency for withdrawal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={createWithdrawal}>
                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    name="amount"
              value={amount}
              onChange={(e) => handleInput(e, stateSetters)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                {/* wallet Address */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Wallet Address</Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
              value={address}
              onChange={(e) => handleInput(e, stateSetters)}
                    placeholder="Enter Wallet Address"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                          
                {/* Cryptocurrency Selector */}
                <div className="space-y-2">
                  <Label htmlFor="crypto">Cryptocurrency</Label>
                  <select
                    id="crypto"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                    name="method"
            
              onChange={(e) => handleInput(e, stateSetters)}
                  >
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                </select>
                </div>
                
                {/* Request Withdrawal Button */}
                <Button  type="submit" className="w-full">Request Withdrawal</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      

      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Withdrawal History
      </h2>
      <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle style={{color: 'white'}}>Recent Withdrawal History</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400">
                        <th className="pb-4">SN</th>
                        <th className="pb-4">User</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Wallet Address</th>
                        <th className="pb-4">Crypto Currency</th>
                        <th className="pb-4">Status</th>
                        {isAdmin && (
                          <th className="pb-4">Action</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((tx,i) => <tr key={tx.id} className="border-t border-gray-700">
                        <td className="py-4 text-white">{i+1}</td>
                        <td className="py-4 text-white">{tx.user && tx.user.name}</td>
                        <td className={`py-4 ${tx.status == 1? 'text-green-400' : 'text-red-400'}`}>{tx.amount && tx.amount}</td>
                        <td className="py-4 text-white">{tx.withdrawal != null ? convertToDateFormat(tx.withdrawal.created_at) : "NULL"}</td>
                        <td className="py-4 text-white">{tx.withdrawal != null ? tx.withdrawal.wallet_address : "NULL"}</td>
                        <td className="py-4 text-white">{tx.method != null ? tx.method : "NULL"}</td>
                        <td className="py-4 text-white">
                          <span className={`px-2 py-1 rounded-full text-xs ${tx.status === 1 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {tx.status === 1 ? 'completed' : 'pending'}
                           
                          </span>
                        </td>
                        {isAdmin && (
                          <td className={`px-4 py-2 ${
                              tx.status === 1
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                            {tx.status === 0 && (
                              <Button
                              onClick={() => approveWithdrawal(tx.id)}
                                // onClick={() => handleConfirmPayment()}
                                // onClick={() => handleConfirmPayment(tx)}
                                // onClick={handleConfirmPayment}
                                className="bg-blue-600 hover:bg-blue-500 text-white"
                              >
                                {indexLoading == tx.id ? "Processing..." : "Approve"}
                              </Button>
                            )}
                            {tx.status === 1 && (
                              <span>Approved</span>
                            )}
                          </td>
                        )}
                      </tr>
                      )}
                    </tbody>
                  
                    </table>
                    
                    </CardContent>
                   </Card>
                   
    </div>
    
  );
}

