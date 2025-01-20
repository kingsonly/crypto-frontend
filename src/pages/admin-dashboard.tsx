'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bitcoin, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, RefreshCw, History, Package, User, Menu } from 'lucide-react'
import DepositTab from '@/components/dashboard/DespositTab'
import WithdrawTab from '@/components/dashboard/WithdrawTab'
import TransferTab from '@/components/dashboard/TransferTab'
import TransactionsTab from '@/components/dashboard/TransactionsTab'
import PackagesTab from '@/components/dashboard/PackagesTab'
import InvestmentHistoryTab from '@/components/dashboard/InvestmentHistoryTab'
import EarningsTab from '@/components/dashboard/EarningsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'
import DashboardTab from '@/components/dashboard/DashboardTab'
import WalletAddressTab from '@/components/dashboard/WalletAddressTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState(false);
  const [file, setFile] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let getToken: any = JSON.parse(localStorage.getItem('user'));
    if (getToken && getToken.token) {
      setToken(getToken.token)
      setIsAdmin(getToken.is_admin || false);

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
      case 'walletAddress':
        return <WalletAddressTab />
      default:
        return <DashboardTab />
    }
  }

  const menuItems = [
    { name: 'Dashboard', icon: <Wallet className="h-5 w-5" />, id: 'dashboard' },
    { name: 'Deposit', icon: <ArrowDownRight className="h-5 w-5" />, id: 'deposit' },
    { name: 'Withdraw', icon: <ArrowUpRight className="h-5 w-5" />, id: 'withdraw' },
    { name: 'Transactions', icon: <History className="h-5 w-5" />, id: 'transactions' },
    { name: 'Invest', icon: <Package className="h-5 w-5" />, id: 'packages' },
    { name: 'Investment History', icon: <History className="h-5 w-5" />, id: 'investment-history' },
    { name: 'Earnings', icon: <DollarSign className="h-5 w-5" />, id: 'earnings' },
    { name: file, icon: <User className="h-5 w-5" />, id: 'profile' },
    { name: 'Wallet Address', icon: <Wallet className="h-5 w-5" />, id: 'walletAddress' },
  ];

  const NavContent = () => (
    <nav>
      <ul className="space-y-2">
        {menuItems.map((item) => (

          item.name !== "Wallet Address" ?
            <li key={item.id}>
              <Button
                className={`w-full justify-start ${activeTab === item.id ? 'bg-gray-800' : ''} hover:bg-accent hover:text-accent-foreground`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            </li>
            : item.name == "Wallet Address" && isAdmin ?
              <li key={item.id}>
                <Button
                  className={`w-full justify-start ${activeTab === item.id ? 'bg-gray-800' : ''} hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Button>
              </li>
              : null
        ))}
      </ul>
    </nav>
  );

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
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 bg-gray-900 p-6 overflow-y-auto">
          <div className="flex items-center mb-8">
            <Bitcoin className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              CoinShares Mining
            </span>
          </div>
          <NavContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Mobile menu */}
          <div className="md:hidden mb-4 fixed w-full top-0 left-0 z-50 bg-gray-900 pt-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <div className="w-full">
                <div className="grid grid-cols-2 items-center mb-8 w-full  px-4">
                  <div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                      CoinShares
                    </span>
                  </div>
                  <div className="grid justify-self-end">
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6 text-[#000]" />
                      </Button>
                    </SheetTrigger>
                  </div>
                </div>
              </div>

              <SheetContent
                side="left"
                className="w-full bg-gray-900 p-6 text-white"
                style={{
                  '--close-button-bg': 'red',
                  '--close-button-color': 'white',
                } as React.CSSProperties}
              >
                <div className="flex items-center mb-8">
                  <Bitcoin className="h-8 w-8 text-yellow-400 mr-2" />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                    CoinShares Mining
                  </span>
                </div>
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="max-w-6xl mx-auto mt-[90px]">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}