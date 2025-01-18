import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Bitcoin, DollarSign } from "lucide-react"
import TopMenu from "../components/menu/TopMenu";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Pricing() {
  const baseUrl = import.meta.env.VITE_API_URL;
  interface Investment {
    id: number;
    name: string;
    rate: number;
    period: number;
    minInvestment: number;
    maxInvestment: number;
  }
  const [plans, setPlans] = useState<Investment[]>([]);

  useEffect(() => {
    fetchInvestments();
  }, []);
  const fetchInvestments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pricing`);

      if (response.data.status === "success") {
        console.log("All Packages", response.data);
        const filteredInvestments = response.data.data.map((inv: any) => ({
          id: inv.id,
          name: inv.name,
          rate: inv.interest_rate || 0,
          period: inv.duration,
          minInvestment: inv.minimum_amount,
          maxInvestment: inv.maximum_amount,
        }));

        setPlans(filteredInvestments);
      } else {
        console.error("Error fetching investments: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {

    }
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };



  const getBackgroundClass = (index: number) => {
    const classes = [
      "bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20",
      "bg-gradient-to-br from-cyan-900/50 to-teal-900/50 border-cyan-500/20",
      "bg-gradient-to-br from-teal-900/50 to-green-900/50 border-teal-500/20",
    ];
    return classes[index % classes.length];
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-screen">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-teal-700/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 animate-pulse"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <TopMenu />

        {/* Hero Section */}
        <section className="pt-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-6xl mx-auto py-20 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Investment Plans
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              We offer our investors a unique opportunity to start investing in the most profitable sector of the 21st century. Start earning today with Coinshares Mining.
            </p>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900/50 z-0"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm group hover:scale-105 ${getBackgroundClass(
                    index
                  )}`}
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-300">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-4 text-white">
                    {plan.rate} %  <span className="text-xl text-gray-300">IN {plan.period} DAYS</span>
                  </div>
                  <ul className="space-y-2 mb-6">

                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" /> Min investment:{" "}
                      ${plan.minInvestment}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" /> Max investment:{" "}
                      ${plan.maxInvestment}
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" /> 24/7 Withdrawal
                    </li>
                  </ul>
                  <Button
                    onClick={handleClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}


              {/* Starter Plan */}
              {/* <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-500/20 group hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Starter Plan</h3>
                <div className="text-4xl font-bold mb-4 text-white">10% <span className="text-xl text-gray-300">monthly</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 5% First time deposit bonus</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Min investment: $2,000</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Max investment: $19,999</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 24/7 Withdrawal</li>
                </ul>
                <Button
                  onClick={handleClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div> */}

              {/* Premium Plan */}
              {/* <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-cyan-500/20 group hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Premium Plan</h3>
                <div className="text-4xl font-bold mb-4 text-white">15% <span className="text-xl text-gray-300">monthly</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 5% First time deposit bonus</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Min investment: $20,000</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Max investment: $99,999</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 24/7 Withdrawal</li>
                </ul>
                <Button
                  onClick={handleClick}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div> */}

              {/* Wealth Management Plan */}
              {/* <div className="bg-gradient-to-br from-teal-900/50 to-green-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-teal-500/20 group hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-teal-300">Wealth Management Plan</h3>
                <div className="text-4xl font-bold mb-4 text-white">35% <span className="text-xl text-gray-300">quarterly</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 5% First time deposit bonus</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Min investment: $100,000</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> Max investment: $500,000</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" /> 24/7 Withdrawal</li>
                </ul>
                <Button
                  onClick={handleClick}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-blue-900/50 to-black relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Additional Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-6 rounded-lg backdrop-blur-sm border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Referral Bonus</h3>
                <p className="text-lg text-gray-300">Earn a 2% referral bonus on all plans when you invite others to invest.</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 p-6 rounded-lg backdrop-blur-sm border border-cyan-500/20">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">Payment Options</h3>
                <p className="text-lg text-gray-300">We accept multiple cryptocurrencies for your convenience.</p>
                <div className="flex space-x-4 mt-4">
                  <Bitcoin className="h-8 w-8 text-yellow-400" />

                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 animate-pulse"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Start Your Investment Journey Today</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join Coinshares Mining and be part of the future of Bitcoin mining and digital infrastructure.
            </p>
            <Button onClick={handleClick} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}