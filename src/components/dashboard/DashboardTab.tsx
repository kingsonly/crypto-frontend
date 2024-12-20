// import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Users, ArrowUpRight } from "lucide-react";


export default function DashboardTab() {

  // useEffect(() => {
  //     const getToken = JSON.parse(localStorage.getItem("user") || "{}");
  //     console.log(getToken);
      
  //   // const token = getToken.token;
  // }, []);

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