import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState,useEffect } from "react";

export default function WithdrawTab() {
  const baseUrl = import.meta.env.VITE_API_URL
  const [amount,setAmount] = useState<string>();
  const [address,setAddress] = useState<string>();
  const [method,setMethod] = useState<string>();
  const [token,setToken] = useState<string>();
  const [history,setHistory] = useState<any>([]);

  const stateSetters = {
    amount: setAmount,
    method: setMethod,
    address: setAddress,
  };

  useEffect(()=> {
    let getToken:any = JSON.parse(localStorage.getItem('user'))
    setToken(getToken.token)
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
      setHistory(response.data.data)
    })
    .catch((error:any) => {
      alert("somthing went wrong ")
    })
   
  } 
  
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
      }},
      )
    .then(function (response:any) {
      if(response.data.status === "success")
      alert("withdrawal request has been made to the administrator")
    })
    .catch((error:any) => {
      alert("somthing went wrong ")
    })
   
  } 
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
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
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Wallet Address</th>
                        <th className="pb-4">Crypto Currency</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((tx,i) => <tr key={tx.id} className="border-t border-gray-700">
                        <td className="py-4">{i+1}</td>
                        <td className={`py-4 ${tx.status == 1? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</td>
                        <td className="py-4">{convertToDateFormat(tx.withdrawal.created_at)}</td>
                        <td className="py-4">{tx.withdrawal.wallet_address}</td>
                        <td className="py-4">{tx.method}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${tx.status === 1 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {tx.status === 1 ? 'completed' : 'pending'}
                           
                          </span>
                        </td>
                      </tr>
                      )}
                    </tbody>
                  
                    </table>
                    
                    </CardContent>
                   </Card>
                   
    </div>
    
  );
}

