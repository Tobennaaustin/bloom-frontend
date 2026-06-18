import { useNavigate } from 'react-router-dom'
import {
  BarChart3, Bell, Lightbulb, TrendingUp, ShoppingBag,
  CheckCircle2, ArrowRight, Star, Package, AlertTriangle,
  ChevronDown, Zap, Target, RefreshCw
} from 'lucide-react'
import Hero from '@/components/client/hero'
import Nav from '@/components/client/nav'
import Why from '@/components/client/why'
import How from '@/components/client/how'
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll'
import { useState } from 'react'


const FEATURES = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Demand Analysis",
    desc: "Know exactly which products Crawford students buy most — backed by real survey data from 465 students.",
    color: "bg-[#1f514c] text-white",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Restock Alerts",
    desc: "Get notified before you run out. Bloom calculates your restock point and warns you ahead of time.",
    color: "bg-[#1f514c] text-white",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Product Suggestions",
    desc: "Discover products students wish you sold. Add the right items and capture demand your competitors miss.",
    color: "bg-[#1f514c] text-white",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Quantity Predictor",
    desc: "Stop guessing how much to stock. Bloom tells you exactly how many units to order each week.",
    color: "bg-[#1f514c] text-white",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Gap Analysis",
    desc: "See where student demand exceeds what vendors supply — your biggest untapped revenue opportunities.",
    color: "bg-[#1f514c] text-white",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Restock Schedule",
    desc: "Know your optimal restock frequency per product. Never over-buy or under-buy again.",
    color: "bg-[#1f514c] text-white",
  },
];


const STATS = [
  { value: '465', label: 'Student responses analysed' },
  { value: '83%', label: 'Students buy water daily' },
  { value: '42%', label: 'Stopped buying from vendors due to stockouts' },
  { value: '100%', label: 'Vendors would use this system' },
]


export default function LandingPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center overflow-hidden justify-center bg-white text-black">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="pb-16 max-w-[1200px] px-4">
        <Nav />
        <Hero />
      </div>

      <div className="max-w-[1200px] w-full px-4">
        <Why />
        <How />
      </div>

      {/* ── STATS BAND ───────────────────────────────────────────────────── */}
      <section className="bg-[#1f514c] py-14 px-6">
        <StaggerContainer className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
          {STATS.map((s, i) => (
            <StaggerItem key={i} animation="fade-up" className="text-center">
              <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-sm text-green-100">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-24 px-6">
        <div
          className="flex flex-col max-w-[1200px] justify-center items-center gap-16 py-16"
          id="features">
          <AnimateOnScroll className="flex flex-col gap-6 text-center">
            <div className="flex items-center font-medium justify-center gap-2 text-[#1f514c]">
              <div className="w-2 h-2 bg-[#1f514c] rounded-full">
                <div className="w-2 h-2 bg-[#1f514c] rounded-full animate-ping"></div>
              </div>
              <p className="text-sm">Features</p>
            </div>
            <div className="sm:text-5xl leading-[120%] text-4xl max-w-[600px] hedvig text-center">
              What you get
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-center" stagger={0.08}>
            {FEATURES.map((f, i) => (
              <StaggerItem
                key={i}
                animation="fade-up"
                className=" p-6 flex flex-col items-center  transition-all duration-200 text-center">
                <div
                  className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4 text-center`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] w-full px-4">
        <div className="flex flex-col justify-center items-center gap-16 pt-42 pb-16">
          <AnimateOnScroll animation="fade-in" className="sm:max-w-[350px] w-[80%] flex flex-col justify-center text-center gap-5">
            <div className="flex items-center justify-center gap-3">
              <img
                src="/image.png"
                alt="logo"
                className="w-8"
              />
              <p className="md:text-2xl text-[24px] tracking-tight text-black font-medium hedvig pt-1">
                Bloom
              </p>
            </div>
            <div>Built for Crawford University vendors.</div>
            <div className="flex mx-auto text-xs gap-2 py-[5px] rounded-lg px-[10px] items-center">
              <p>© 2026 Bloom</p>
              <div className="w-1.5 h-1.5 bg-[#1f514c] rounded-full"></div>
              <p>All Rights Reserved</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
