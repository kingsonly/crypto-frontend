import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function EarningsTab() {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Earnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-400">$12,543.00</div>
              <p className="text-gray-400 mt-2">Lifetime earnings from all investments</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
  
            </CardContent>
          </Card>
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>Your earnings over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
  
          </CardContent>
        </Card>
      </div>
    )
  }
  