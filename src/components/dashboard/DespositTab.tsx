import { Button } from "@/components/ui/button";
import { Bitcoin } from "lucide-react";
// Import the Card components
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DepositTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Deposit Funds
      </h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Choose Deposit Method</CardTitle>
          <CardDescription>Select a cryptocurrency to deposit funds into your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Bitcoin', 'Ethereum', 'USDT'].map((crypto) => (
              <Button key={crypto} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Bitcoin className="h-6 w-6 mb-2" />
                {crypto}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}