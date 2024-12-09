import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function WithdrawTab() {
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
          <form className="space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="bg-gray-700 border-gray-600"
              />
            </div>

             {/* wallet Address */}
             <div className="space-y-2">
              <Label htmlFor="amount">Wallet Address</Label>
              <Input
                id="amount"
                type="text"
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
              >
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>USDT</option>
              </select>
            </div>
            
            {/* Request Withdrawal Button */}
            <Button className="w-full">Request Withdrawal</Button>
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
                    gjh
                  
                    </table>
                    
                    </CardContent>
                   </Card>
                   
    </div>
    
  );
}
