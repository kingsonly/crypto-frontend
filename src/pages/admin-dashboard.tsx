'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Bitcoin, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, RefreshCw, History, Package, User } from "lucide-react"
import DepositTab from '@/components/dashboard/DespositTab'
import WithdrawTab from '@/components/dashboard/WithdrawTab'
import TransferTab from '@/components/dashboard/TransferTab'
import TransactionsTab from '@/components/dashboard/TransactionsTab'
import PackagesTab from '@/components/dashboard/PackagesTab'
import InvestmentHistoryTab from '@/components/dashboard/InvestmentHistoryTab'
import EarningsTab from '@/components/dashboard/EarningsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'
import DashboardTab from '@/components/dashboard/DashboardTab'
import { devNull } from 'os'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState(false);
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    let getToken: any = JSON.parse(localStorage.getItem('user'));
    if (getToken && getToken.token) {
      // console.log('message',getToken)
      setToken(getToken.token)
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property

      if (getToken.is_admin == 1) {
        setFile("Users");
      } else {
        setFile("Profile");
      }
    }
  }, [])



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
                // { name: 'P2P Transfer', icon: <RefreshCw className="h-5 w-5" />, id: 'transfer' },
                { name: 'Transactions', icon: <History className="h-5 w-5" />, id: 'transactions' },
                { name: 'Invest', icon: <Package className="h-5 w-5" />, id: 'packages' },
                { name: 'Investment History', icon: <History className="h-5 w-5" />, id: 'investment-history' },
                { name: 'Earnings', icon: <DollarSign className="h-5 w-5" />, id: 'earnings' },
                { name: file, icon: <User className="h-5 w-5" />, id: 'profile' },
              ].map((item) => (

                <li key={item.id}>
                  <Button

                    className={`w-full justify-start ${activeTab === item.id ? 'bg-gray-800' : ''}  hover:bg-accent hover:text-accent-foreground`}
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