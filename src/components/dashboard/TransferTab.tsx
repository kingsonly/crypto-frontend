import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TransferTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        P2P Transfer
      </h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
          <CardDescription>Send funds to another user on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Recipient Input */}
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Username or Email</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="Enter recipient"
                className="bg-gray-700 border-gray-600"
              />
            </div>

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

            {/* Send Transfer Button */}
            <Button className="w-full">Send Transfer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}