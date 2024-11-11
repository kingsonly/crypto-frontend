'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
//import { AreaChart, BarChart } from "@/components/ui/chart"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bitcoin, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, RefreshCw, Users, History, Package, User } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />
      case 'deposit':
        return <DepositTab />
      case 'withdraw':
        return <WithdrawTab />
      case 'transfer':
        return <TransferTab />
      case 'transactions':
        return <TransactionsTab />
      case 'packages':
        return <PackagesTab />
      case 'investment-history':
        return <InvestmentHistoryTab />
      case 'earnings':
        return <EarningsTab />
      case 'profile':
        return <ProfileTab />
      default:
        return <DashboardTab />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-screen">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-teal-700/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 animate-pulse"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 overflow-y-auto">
          <div className="flex items-center mb-8">
            <Bitcoin className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              CoinShares Mining
            </span>
          </div>
          <nav>
            <ul className="space-y-2">
              {[
                { name: 'Dashboard', icon: <Wallet className="h-5 w-5" />, id: 'dashboard' },
                { name: 'Deposit', icon: <ArrowDownRight className="h-5 w-5" />, id: 'deposit' },
                { name: 'Withdraw', icon: <ArrowUpRight className="h-5 w-5" />, id: 'withdraw' },
                { name: 'P2P Transfer', icon: <RefreshCw className="h-5 w-5" />, id: 'transfer' },
                { name: 'Transactions', icon: <History className="h-5 w-5" />, id: 'transactions' },
                { name: 'Packages', icon: <Package className="h-5 w-5" />, id: 'packages' },
                { name: 'Investment History', icon: <History className="h-5 w-5" />, id: 'investment-history' },
                { name: 'Earnings', icon: <DollarSign className="h-5 w-5" />, id: 'earnings' },
                { name: 'Profile', icon: <User className="h-5 w-5" />, id: 'profile' },
              ].map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === item.id ? 'bg-gray-800' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-400">Across 2 packages</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.00</div>
            <p className="text-xs text-gray-400">Lifetime earnings</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-gray-400">Due in 7 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>

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
    </div>
  )
}

function DepositTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Deposit Funds</h2>
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
  )
}

function WithdrawTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Withdraw Funds</h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Withdrawal Request</CardTitle>
          <CardDescription>Enter the amount and choose the cryptocurrency for withdrawal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" className="bg-gray-700 border-gray-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crypto">Cryptocurrency</Label>
              <select id="crypto" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md">
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>USDT</option>
              </select>
            </div>
            <Button className="w-full">Request Withdrawal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function TransferTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">P2P Transfer</h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
          <CardDescription>Send funds to another user on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Username or Email</Label>
              <Input id="recipient" type="text" placeholder="Enter recipient" className="bg-gray-700 border-gray-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" className="bg-gray-700 border-gray-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crypto">Cryptocurrency</Label>
              <select id="crypto" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md">
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>USDT</option>
              </select>
            </div>
            <Button className="w-full">Send Transfer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function TransactionsTab() {
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

function PackagesTab() {
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

function InvestmentHistoryTab() {
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

function EarningsTab() {
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

function ProfileTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="bg-gray-700 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="bg-gray-700 border-gray-600" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-gray-700 border-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 234 567 8900" className="bg-gray-700 border-gray-600" />
              </div>
              <Button>Update Profile</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Change Password</span>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}