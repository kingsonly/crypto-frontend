import { Card,CardHeader,CardTitle,CardDescription,CardContent, } from "@/components/ui/card";

export default function TransactionsTab() {
        const transactions = [
            { id: 1, type: 'Deposit', amount: '+0.05 BTC', date: '2023-06-01', status: 'Completed' },
            { id: 2, type: 'Withdrawal', amount: '-0.03 BTC', date: '2023-05-28', status: 'Pending' },
            { id: 3, type: 'Transfer', amount: '-0.01 BTC', date: '2023-05-25', status: 'Completed' },
            { id: 4, type: 'Earnings', amount: '+0.002 BTC', date: '2023-05-20', status: 'Completed' },
          ]
        
          return (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Transactions</h2>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest account activities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400">
                        <th className="pb-4">Type</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => <tr key={tx.id} className="border-t border-gray-700">
                        <td className="py-4">{tx.type}</td>
                        <td className={`py-4 ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</td>
                        <td className="py-4">{tx.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${tx.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
    )
}