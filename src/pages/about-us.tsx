import { Button } from "@/components/ui/button"
import { ArrowRight, Bitcoin, Zap, Globe, Target, Rocket } from "lucide-react"
import vision from "../assets/images/vision.jpg";
import TopMenu from "../components/menu/TopMenu";
import Footer from "../components/footer/Footer";
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-teal-700/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 animate-pulse"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <TopMenu />

        {/* Hero Section */}
        <section className="pt-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-full mx-auto py-20 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              About Coinshares Mining
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl">
              Supporting the Bitcoin blockchain through rapidly expanding large-scale mining in the United States and El Salvador.
            </p>
          </div>
        </section>

        {/* Vision and Mission Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900/50 z-0"></div>
          <div className="max-w-full mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-lg backdrop-blur-sm border border-blue-500/20">
                  <Target className="h-12 w-12 text-blue-400 mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-blue-300">Our Vision</h2>
                  <p className="text-lg text-gray-300">
                    To be the world's leading Bitcoin-driven mining platform.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 p-8 rounded-lg backdrop-blur-sm border border-cyan-500/20">
                  <Rocket className="h-12 w-12 text-cyan-400 mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-cyan-300">Our Mission</h2>
                  <p className="text-lg text-gray-300">
                    To positively impact the sectors, networks and communities that we touch. We believe that the combination of an innovative spirit and strong community partnership allows the Company to achieve best-in-class execution and create successful outcomes.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <img
                  src={vision}
                  alt="Coinshares Mining Facility"
                  className="rounded-lg shadow-2xl relative w-[100%] h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Focus Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-blue-900/50 to-black relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="max-w-full mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Our Focus</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-500/20 group hover:scale-105">
                <Bitcoin className="h-12 w-12 text-yellow-400 mb-4 group-hover:animate-spin-slow" />
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Bitcoin Mining</h3>
                <p className="text-lg text-gray-300">Focused on expanding operations by increasing our Bitcoin mining hash rate and infrastructure capacity.</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-cyan-500/20 group hover:scale-105">
                <Globe className="h-12 w-12 text-blue-400 mb-4 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Global Presence</h3>
                <p className="text-lg text-gray-300">Operating Bitcoin mining data centers in North America and El Salvador.</p>
              </div>
              <div className="bg-gradient-to-br from-teal-900/50 to-green-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-teal-500/20 group hover:scale-105">
                <Zap className="h-12 w-12 text-green-400 mb-4 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold mb-4 text-teal-300">Vertical Integration</h3>
                <p className="text-lg text-gray-300">Employing a vertically integrated strategy in our Bitcoin mining and digital infrastructure operations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 animate-pulse"></div>
          <div className="max-w-full mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Join the Bitcoin Mining Revolution</h2>
            <p className="text-xl mb-8 text-gray-300">
              Be part of the future of finance and energy. Invest in Coinshares Mining today and unlock the potential of Bitcoin.
            </p>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Invest Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
