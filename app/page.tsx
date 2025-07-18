import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, BookOpen, Lightbulb, Target, Star, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SEW</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Small Economy Works
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium">
                How It Works
              </Link>
              <Link href="#stories" className="text-gray-700 hover:text-emerald-600 font-medium">
                Success Stories
              </Link>
              <Link href="#programs" className="text-gray-700 hover:text-emerald-600 font-medium">
                Programs
              </Link>
              <Link href="#community" className="text-gray-700 hover:text-emerald-600 font-medium">
                Community
              </Link>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Where Youth Lead</Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Turn Your{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Big Ideas
                  </span>{" "}
                  Into Reality
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Learn entrepreneurship skills while building your dream project. Get funding, mentorship, and
                  community support - all designed by and for Indigenous youth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4"
                >
                  Start Your Project Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-4 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch How It Works
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-sm text-gray-600">Young Entrepreneurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$250K+</div>
                  <div className="text-sm text-gray-600">Funding Distributed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/youth-workshop.png"
                  alt="Youth working together on entrepreneurship projects"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Process Mapping */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              A Different Kind of{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Grant Program
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike traditional grants, we believe in learning while earning. Build skills, get funded, and create
              lasting impact in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="relative overflow-hidden border-emerald-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-100 text-emerald-700">Step 1</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Share Your Idea</h3>
                <p className="text-gray-600">
                  Tell us about your project vision. No business plan required - just passion and purpose.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-100 text-blue-700">Step 2</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Build</h3>
                <p className="text-gray-600">
                  Complete interactive modules while developing your project with mentor support.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-purple-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-100 text-purple-700">Step 3</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Funding</h3>
                <p className="text-gray-600">
                  Receive micro-grants as you complete milestones. No waiting until the end!
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-pink-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-pink-100 text-pink-700">Step 4</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Launch & Impact</h3>
                <p className="text-gray-600">
                  Bring your project to life and create positive change in your community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Real Stories,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h2>
            <p className="text-xl text-gray-600">See how young entrepreneurs are transforming their communities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/community-garden.png" alt="Community garden project" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-emerald-100 text-emerald-700">Community Impact</Badge>
                  <span className="text-sm font-semibold text-emerald-600">$2,500 funded</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Urban Indigenous Garden</h3>
                <p className="text-gray-600 mb-4">
                  "I created a community garden that teaches traditional plant knowledge to urban Indigenous youth. SEW
                  helped me turn my passion into a thriving community space."
                </p>
                <div className="flex items-center space-x-3">
                  <Image src="/avatars/fireweed.png" alt="Sarah" width={40} height={40} className="rounded-full" />
                  <div>
                    <div className="font-medium">Sarah, 19</div>
                    <div className="text-sm text-gray-500">Vancouver, BC</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/red-barn-landscape.png" alt="Traditional arts workshop" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-700">Cultural Arts</Badge>
                  <span className="text-sm font-semibold text-blue-600">$3,200 funded</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Traditional Arts Collective</h3>
                <p className="text-gray-600 mb-4">
                  "My beadwork and traditional arts workshops now serve 50+ youth monthly. SEW gave me the business
                  skills to scale my cultural teachings."
                </p>
                <div className="flex items-center space-x-3">
                  <Image src="/avatars/arctic-willow.png" alt="Maria" width={40} height={40} className="rounded-full" />
                  <div>
                    <div className="font-medium">Maria, 22</div>
                    <div className="text-sm text-gray-500">Winnipeg, MB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image src="/mountain-terrain.png" alt="Tech innovation project" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-purple-100 text-purple-700">Tech Innovation</Badge>
                  <span className="text-sm font-semibold text-purple-600">$4,000 funded</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Language Learning App</h3>
                <p className="text-gray-600 mb-4">
                  "I built an app that helps preserve our Indigenous language through interactive games. Now it's used
                  in schools across three provinces!"
                </p>
                <div className="flex items-center space-x-3">
                  <Image src="/avatars/labrador-tea.png" alt="Jordan" width={40} height={40} className="rounded-full" />
                  <div>
                    <div className="font-medium">Jordan, 20</div>
                    <div className="text-sm text-gray-500">Calgary, AB</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              View All Success Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Turn Your Idea Into Impact?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of young Indigenous entrepreneurs who are building the future. It's free to get started, and
            you'll have support every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-4">
              Start Your Project Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent"
            >
              Talk to a Mentor First
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-emerald-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free to get started</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>1-on-1 mentorship</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Funding while you learn</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Community Says
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-emerald-100">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "SEW didn't just give me funding - they gave me confidence. The mentorship and community support made
                all the difference in my journey."
              </p>
              <div className="flex items-center space-x-3">
                <Image src="/avatars/yarrow.png" alt="Alex" width={40} height={40} className="rounded-full" />
                <div>
                  <div className="font-medium">Alex, 21</div>
                  <div className="text-sm text-gray-500">Social Enterprise Founder</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-100">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The learning modules were actually fun and relevant to my project. I learned business skills while
                building something I'm passionate about."
              </p>
              <div className="flex items-center space-x-3">
                <Image src="/avatars/dwarf-birch.png" alt="Taylor" width={40} height={40} className="rounded-full" />
                <div>
                  <div className="font-medium">Taylor, 18</div>
                  <div className="text-sm text-gray-500">Tech Entrepreneur</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I love how SEW celebrates our culture while teaching modern business skills. It's exactly what our
                community needed."
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/avatars/fireweed-illustration.png"
                  alt="River"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">River, 23</div>
                  <div className="text-sm text-gray-500">Cultural Arts Leader</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SEW</span>
                </div>
                <span className="text-xl font-bold">Small Economy Works</span>
              </div>
              <p className="text-gray-400">
                Empowering Indigenous youth to build thriving businesses and stronger communities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Programs</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Entrepreneurship
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Mentorship
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Funding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Small Economy Works. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
