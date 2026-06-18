import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Store, Package, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Progress } from '@/components/ui/index'
import { BloomLogo } from '@/components/ui/Logo'
import { authApi } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { OnboardingData, StoreType } from '@/types'

const STORE_TYPES: { value: StoreType; label: string; emoji: string; desc: string }[] = [
  { value: 'provision',  label: 'Provision / Grocery', emoji: '🏪', desc: 'Provisions, canned goods, drinks' },
  { value: 'food',       label: 'Food Vendor',          emoji: '🍛', desc: 'Cooked food, snacks, bread' },
  { value: 'drinks',     label: 'Drinks & Water',       emoji: '🥤', desc: 'Water, soft drinks, beverages' },
  { value: 'stationery', label: 'Stationery / Books',   emoji: '📚', desc: 'Pens, books, printing' },
  { value: 'toiletries', label: 'Cosmetics / Toiletries',emoji: '🧴', desc: 'Soap, cream, hygiene items' },
  { value: 'mixed',      label: 'Mixed Store',           emoji: '🛒', desc: 'Multiple product categories' },
]

const SUGGESTED_PRODUCTS: Record<StoreType, string[]> = {
  provision:  ['Pure water (bags)', 'Soft drinks', 'Bread', 'Gala/Sausage roll', 'Biscuits', 'Indomie', 'Milo/Bournvita', 'Tin tomato', 'Rice', 'Sugar'],
  food:       ['Jollof rice', 'White rice', 'Beans', 'Bread & egg', 'Indomie', 'Fried plantain', 'Pepper soup', 'Moi moi', 'Yam', 'Eba/Fufu'],
  drinks:     ['Pure water (bags)', 'Coke/Pepsi/Fanta', 'Malt', 'Hollandia yoghurt', 'Energy drinks', 'Bottled water', 'Juice (5 alive)', 'Gala'],
  stationery: ['Biro/Pens', 'Exercise books', 'Jotters', 'Printer paper', 'Stapler', 'Tape', 'Cardboard', 'Pencils', 'Markers', 'Folders'],
  toiletries: ['Soap (bathing)', 'Toothpaste', 'Tissue paper', 'Lotion', 'Deodorant', 'Dettol', 'Hair cream', 'Sanitary pads', 'Cotton wool'],
  mixed:      ['Pure water (bags)', 'Soft drinks', 'Biscuits', 'Bread', 'Pens/Books', 'Soap', 'Tissue', 'Indomie', 'Provisions', 'Snacks'],
}

const RESTOCK_TIMES = [
  { value: 'daily',       label: 'Every day' },
  { value: '2-3days',     label: 'Every 2–3 days' },
  { value: 'weekly',      label: 'Once a week' },
  { value: 'biweekly',    label: 'Every 2 weeks' },
  { value: 'irregular',   label: 'Irregularly / when needed' },
]

const TOTAL_STEPS = 4

const STEP_META = [
  { icon: <User className="w-5 h-5"/>,    label: 'Account' },
  { icon: <Store className="w-5 h-5"/>,   label: 'Store Type' },
  { icon: <Package className="w-5 h-5"/>, label: 'Products' },
  { icon: <Clock className="w-5 h-5"/>,   label: 'Details' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setAuthFromOnboarding } = useAuth()

  const [data, setData] = useState<OnboardingData>({
    step: 1,
    name: '', email: '', password: '',
    storeName: '', storeType: '',
    products: [], restockTime: '',
    location: 'Crawford University, Igbesa',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const update = (key: keyof OnboardingData, value: unknown) => {
    setData(d => ({ ...d, [key]: value }))
    setErrors(e => ({ ...e, [key]: '' }))
    setApiError('')
  }

  const toggleProduct = (p: string) => {
    setData(d => ({
      ...d,
      products: d.products.includes(p)
        ? d.products.filter(x => x !== p)
        : [...d.products, p],
    }))
  }

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (data.step === 1) {
      if (!data.name.trim())     e.name = 'Name is required'
      if (!data.email.trim())    e.email = 'Email is required'
      if (data.password.length < 6) e.password = 'Password must be at least 6 characters'
      if (!data.storeName.trim()) e.storeName = 'Store name is required'
    }
    if (data.step === 2 && !data.storeType) e.storeType = 'Please select a store type'
    if (data.step === 3 && data.products.length === 0) e.products = 'Please select at least one product'
    if (data.step === 4 && !data.restockTime) e.restockTime = 'Please select restock frequency'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (data.step < TOTAL_STEPS) {
      setData(d => ({ ...d, step: d.step + 1 }))
    } else {
      handleSubmit()
    }
  }

  const back = () => {
    if (data.step > 1) setData(d => ({ ...d, step: d.step - 1 }))
    else navigate('/')
  }

  const handleSubmit = async () => {
    setLoading(true)
    setApiError('')
    try {
      const res = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        storeName: data.storeName,
        storeType: data.storeType,
        products: data.products,
        restockTime: data.restockTime,
        location: data.location,
      })
      const { token, user } = res.data
      setAuthFromOnboarding(token, user)
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = (err as {response?: {data?: {error?: string}}})?.response?.data?.error
      setApiError(msg || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const progress = ((data.step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="flex sm:h-screen bg-white text-black justify-center w-full mx-auto items-start lg:pt-0 lg:px-0 px-4 sm:items-center relative transition-opacity duration-700 ease-out">
      <div className="hidden justify-centers bg-[#1f514c]  w-[50%] m-0 lg:flex  h-full items-cente">
        <img
          alt="young woman shopping clothes"
          loading="eager"
          width="2000"
          height="2000"
          decoding="async"
          data-nimg="1"
          className="w-full h-full object-cover rounded-[inherit] bg-transparent"
          src="/onboard.png"></img>
      </div>

      <div className="flex lg:w-[50%] w-full justify-center bg-white  h-fit items-start sm:items-center">
        <div className="lg:max-w-[400px] gap-10 w-full max-w-[360px] pt-6 sm:pt-0 justify-start sm:justify-center flex flex-col items-start relative">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-transparent flex justify-center items-center w-[50px]">
              <img
                src="/image.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card */}
          <div className="overflow-hidden w-full">
            <div className="flex w-[500%] translate-x-0 transition-all duration-500 ease-in-out">
              <div className="w-[20%]">
                {/* ── Step 1: Account ──────────────────────────────────────── */}
                {data.step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Create your account
                      </h2>
                      <p className="text-sm text-slate-500">
                        Let's get your store set up on Bloom.
                      </p>
                    </div>
                    <Input
                      label="Your full name"
                      placeholder="e.g. Chukwuemeka Eze"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Email address"
                      type="email"
                      placeholder="you@email.com"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      error={errors.email}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={data.password}
                      onChange={(e) => update("password", e.target.value)}
                      error={errors.password}
                    />
                    <Input
                      label="Store name"
                      placeholder="e.g. Mama Nkechi Provisions"
                      value={data.storeName}
                      onChange={(e) => update("storeName", e.target.value)}
                      error={errors.storeName}
                    />
                    <p className="text-xs text-slate-400 text-center">
                      Already have an account?{" "}
                      <button
                        onClick={() => navigate("/login")}
                        className="text-[#1f514c] font-medium hover:underline">
                        Log in
                      </button>
                    </p>
                  </div>
                )}

                {/* ── Step 2: Store Type ───────────────────────────────────── */}
                {data.step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        What type of store?
                      </h2>
                      <p className="text-sm text-slate-500">
                        Bloom customises your report based on your store
                        category.
                      </p>
                    </div>
                    {errors.storeType && (
                      <p className="text-xs text-red-500">{errors.storeType}</p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {STORE_TYPES.map((st) => (
                        <button
                          key={st.value}
                          onClick={() => update("storeType", st.value)}
                          className={`p-4 rounded-s-sm border-2 text-left transition-all duration-200 hover:border-green-400 ${
                            data.storeType === st.value
                              ? "border-green-500 bg-green-50"
                              : "border-slate-100 bg-slate-50 hover:bg-green-50"
                          }`}>
                          <div className="text-2xl mb-2">{st.emoji}</div>
                          <p
                            className={`text-sm font-semibold mb-0.5 ${data.storeType === st.value ? "text-green-700" : "text-slate-800"}`}>
                            {st.label}
                          </p>
                          <p className="text-xs text-slate-400">{st.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Products ─────────────────────────────────────── */}
                {data.step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        What do you sell?
                      </h2>
                      <p className="text-sm text-slate-500">
                        Select all products you currently stock. You can edit
                        this later.
                      </p>
                    </div>
                    {errors.products && (
                      <p className="text-xs text-red-500">{errors.products}</p>
                    )}
                    <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto pr-1">
                      {(data.storeType
                        ? SUGGESTED_PRODUCTS[data.storeType as StoreType]
                        : SUGGESTED_PRODUCTS.mixed
                      ).map((p) => (
                        <button
                          key={p}
                          onClick={() => toggleProduct(p)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                            data.products.includes(p)
                              ? "bg-[#1f514c] text-white border-[#1f514c]"
                              : "bg-white text-slate-600 border-slate-200 hover:border-[#1f514c] hover:text-[#1f514c]"
                          }`}>
                          {data.products.includes(p) && (
                            <Check className="w-3 h-3 inline mr-1" />
                          )}
                          {p}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      {data.products.length} product
                      {data.products.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                )}

                {/* ── Step 4: Details ──────────────────────────────────────── */}
                {data.step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Almost done!
                      </h2>
                      <p className="text-sm text-slate-500">
                        Just a few more details to personalise your Bloom
                        report.
                      </p>
                    </div>
                    <Select
                      label="How often do you restock?"
                      value={data.restockTime}
                      onChange={(e) => update("restockTime", e.target.value)}
                      error={errors.restockTime}>
                      <option value="">Select frequency...</option>
                      {RESTOCK_TIMES.map((r) => (
                        <option
                          key={r.value}
                          value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </Select>
                    <Input
                      label="Store location on campus"
                      placeholder="e.g. Near the gate, Hostel block B"
                      value={data.location}
                      onChange={(e) => update("location", e.target.value)}
                    />

                    {/* Summary */}
                    <div className="bg-green-50 rounded-2xl p-4 space-y-2">
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3">
                        Your Summary
                      </p>
                      {[
                        { label: "Name", value: data.name },
                        { label: "Store", value: data.storeName },
                        {
                          label: "Type",
                          value:
                            STORE_TYPES.find((s) => s.value === data.storeType)
                              ?.label || "",
                        },
                        {
                          label: "Products",
                          value: `${data.products.length} selected`,
                        },
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm">
                          <span className="text-slate-500">{row.label}</span>
                          <span className="font-medium text-slate-800">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {apiError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                        {apiError}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    onClick={back}
                    className="flex-shrink-0 gap-1.5 border-[#1f514c]">
                    <ArrowLeft className="w-4 h-4" />
                    {data.step === 1 ? "Home" : "Back"}
                  </Button>
                  <Button
                    onClick={next}
                    loading={loading}
                    className="flex-1 gap-2 group bg-[#1f514c] text-white">
                    {data.step === TOTAL_STEPS ? "Get my report" : "Continue"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
