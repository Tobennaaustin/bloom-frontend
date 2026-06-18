import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/index'
import { BloomLogo } from '@/components/ui/Logo'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in both fields.'); return }
    setLoading(true); setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

          {/* card */}

          <div className="overflow-hidden w-full">
            <div className="flex w-[500%] translate-x-0 transition-all duration-500 ease-in-out">
              <div className="w-[20%]">
                <div className="mb-3">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    Welcome back
                  </h2>
                  <p className="text-sm text-slate-500">
                    Log in to your Bloom dashboard.
                  </p>
                </div>

                <div className="space-y-4 mb-2">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  className="w-full gap-2 group bg-[#1f514c] mb-3 text-white"
                  loading={loading}
                  onClick={handleLogin}>
                  Log in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/onboarding")}
                    className="text-[#1f514c] font-medium hover:underline">
                    Create one free
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500">
            Log in to your Bloom dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          className="w-full gap-2 group"
          loading={loading}
          onClick={handleLogin}>
          Log in
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-xs text-slate-400 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/onboarding")}
            className="text-green-600 font-medium hover:underline">
            Create one free
          </button>
        </p>
      </div> */}
    </div>
  );
}
