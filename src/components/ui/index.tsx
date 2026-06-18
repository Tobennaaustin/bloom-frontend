import { cn } from '@/lib/utils'
import { HTMLAttributes, InputHTMLAttributes, forwardRef, SelectHTMLAttributes } from 'react'

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-white rounded-2xl border border-slate-100 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props}>{children}</div>
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-semibold text-slate-900 text-lg leading-tight', className)} {...props}>
      {children}
    </h3>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'yellow' | 'red' | 'blue' | 'slate'
}
export function Badge({ className, variant = 'green', children, ...props }: BadgeProps) {
  const variants = {
    green:  'bg-green-50 text-green-700 border border-green-200',
    yellow: 'bg-amber-50 text-amber-700 border border-amber-200',
    red:    'bg-red-50 text-red-700 border border-red-200',
    blue:   'bg-blue-50 text-blue-700 border border-blue-200',
    slate:  'bg-slate-100 text-slate-600 border border-slate-200',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', variants[variant], className)} {...props}>
      {children}
    </span>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ className, label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-s-sm border border-slate-200 bg-white text-sm text-slate-900',
          'placeholder:text-slate-400 outline-none transition-all duration-150',
          'focus:border-green-500 focus:ring-3 focus:ring-green-100',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

// ── Select ────────────────────────────────────────────────────────────────────
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }>(
  ({ className, label, error, children, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900',
          'outline-none transition-all duration-150 cursor-pointer appearance-none',
          'focus:border-green-500 focus:ring-3 focus:ring-green-100',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'

// ── Progress ──────────────────────────────────────────────────────────────────
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('w-full h-1.5 bg-slate-100 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}
export function StatCard({ label, value, sub, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900 font-sora">{value}</p>
          {sub && (
            <p className={cn('text-xs mt-1 font-medium',
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'
            )}>{sub}</p>
          )}
        </div>
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-slate-100', className)} />
}
