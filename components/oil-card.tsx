'use client'

import { Droplet, ChevronRight } from 'lucide-react'
import type { Oil } from '@/lib/types'

interface OilCardProps {
  oil: Oil
  onClick: () => void
}

const categoryGradients: Record<string, { bg: string; icon: string }> = {
  stress: { bg: 'from-violet-100 to-purple-50', icon: 'text-violet-500' },
  sleep: { bg: 'from-indigo-100 to-blue-50', icon: 'text-indigo-500' },
  pain: { bg: 'from-rose-100 to-pink-50', icon: 'text-rose-500' },
  immunity: { bg: 'from-emerald-100 to-green-50', icon: 'text-emerald-500' },
  digestion: { bg: 'from-amber-100 to-yellow-50', icon: 'text-amber-600' },
  skin: { bg: 'from-fuchsia-100 to-pink-50', icon: 'text-fuchsia-500' },
}

const categoryNames: Record<string, string> = {
  stress: '스트레스',
  sleep: '수면',
  pain: '통증',
  immunity: '면역',
  digestion: '소화',
  skin: '피부',
}

export function OilCard({ oil, onClick }: OilCardProps) {
  const gradient = categoryGradients[oil.category] || { bg: 'from-secondary to-muted', icon: 'text-primary' }

  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1"
    >
      {/* Image/Gradient header */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient.bg}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card/80 shadow-lg backdrop-blur-sm">
            <Droplet className={`h-8 w-8 ${gradient.icon}`} />
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          {categoryNames[oil.category]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
          {oil.name_ko}
        </h3>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          {oil.name_en}
        </p>
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-foreground/80">
          {oil.description}
        </p>

        {/* Symptoms tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {oil.symptoms.slice(0, 3).map((symptom) => (
            <span
              key={symptom}
              className="rounded-full bg-secondary/60 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {symptom}
            </span>
          ))}
          {oil.symptoms.length > 3 && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              +{oil.symptoms.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="font-semibold text-primary">자세히 보기</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:text-primary-foreground" />
          </div>
        </div>
      </div>
    </button>
  )
}
