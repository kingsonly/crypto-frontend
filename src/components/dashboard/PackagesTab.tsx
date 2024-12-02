import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PackagesTab() {
    const packages = [
      { id: 1, name: 'Starter', minInvestment: '$2,000', maxInvestment: '$19,999', monthlyProfit: '10%', duration: '12 months' },
      { id: 2, name: 'Premium', minInvestment: '$20,000', maxInvestment: '$99,999', monthlyProfit: '15%', duration: '12 months' },
      { id: 3, name: 'Wealth Management', minInvestment: '$100,000', maxInvestment: '$500,000', monthlyProfit: '35%', duration: '3 months' },
    ]
  
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Investment Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Min Investment: {pkg.minInvestment}</li>
                  <li>Max Investment: {pkg.maxInvestment}</li>
                  <li>Monthly Profit: {pkg.monthlyProfit}</li>
                  <li>Duration: {pkg.duration}</li>
                </ul>
                <Button className="w-full mt-4">Invest Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
  