import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function InvestmentHistoryTab() {
    const investments = [
      { id: 1, package: 'Starter', amount: '$5,000', date: '2023-01-15', status: 'Active', earnings: '$1,500' },
      { id: 2, package: 'Premium', amount: '$25,000', date: '2023-03-01', status: 'Active', earnings: '$3,750' },
      { id: 3, package: 'Starter', amount: '$10,000', date: '2022-11-10', status: 'Completed', earnings: '$6,000' },
    ]
  
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Investment History</h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
            <CardDescription>Track the performance of your investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">Package</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv.id} className="border-t border-gray-700">
                    <td className="py-4">{inv.package}</td>
                    <td className="py-4">{inv.amount}</td>
                    <td className="py-4">{inv.date}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${inv.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
                        }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 text-green-400">{inv.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    )
  }
  