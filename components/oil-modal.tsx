'use client'

import { useEffect, useRef } from 'react'
import { X, Droplet, AlertTriangle, Sparkles, FlaskConical, Heart, Blend } from 'lucide-react'
import type { Oil } from '@/lib/types'

interface OilModalProps {
  oil: Oil | null
  onClose: () => void
}

const categoryGradients: Record<string, string> = {
  stress: 'from-violet-100 to-purple-50',
  sleep: 'from-indigo-100 to-blue-50',
  pain: 'from-rose-100 to-pink-50',
  immunity: 'from-emerald-100 to-green-50',
  digestion: 'from-amber-100 to-yellow-50',
  skin: 'from-fuchsia-100 to-pink-50',
}

export function OilModal({ oil, onClose }: OilModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (oil) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [oil, onClose])

  if (!oil) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const gradient = categoryGradients[oil.category] || 'from-secondary to-muted'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm md:items-center md:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-card shadow-2xl md:max-w-2xl md:rounded-[2rem]"
      >
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-br ${gradient} px-6 pb-8 pt-5`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:scale-105"
            aria-label="닫기"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-5 pt-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card/90 shadow-xl backdrop-blur-sm">
              <Droplet className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 id="modal-title" className="text-2xl font-bold text-foreground md:text-3xl">
                {oil.name_ko}
              </h2>
              <p className="mt-1 text-lg text-muted-foreground">{oil.name_en}</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-foreground/90">
            {oil.description}
          </p>

          {/* Symptoms */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" />
              효능 및 증상
            </h3>
            <div className="flex flex-wrap gap-2">
              {oil.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Usage methods */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <FlaskConical className="h-4 w-4 text-primary" />
              사용 방법
            </h3>
            <ul className="space-y-3">
              {oil.usage_methods.map((method, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span className="flex-1 pt-0.5 text-foreground/90">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipes */}
          {oil.usage_recipes.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                추천 레시피
              </h3>
              <div className="space-y-4">
                {oil.usage_recipes.map((recipe, idx) => (
                  <div key={idx} className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                    <div className="border-b border-border bg-muted/50 px-5 py-3">
                      <h4 className="font-bold text-foreground">{recipe.title}</h4>
                    </div>
                    <div className="p-5">
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-muted-foreground">재료</span>
                        <ul className="mt-2 space-y-1">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-muted-foreground">방법</span>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{recipe.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Synergy oils */}
          {oil.synergy_oils.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Blend className="h-4 w-4 text-primary" />
                시너지 오일
              </h3>
              <div className="flex flex-wrap gap-2">
                {oil.synergy_oils.map((synergy) => (
                  <span
                    key={synergy}
                    className="rounded-full border-2 border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {synergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Diamond tip */}
          {oil.diamond_tip && (
            <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 p-5">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-primary">
                <Sparkles className="h-5 w-5" />
                다이아몬드 팁
              </h3>
              <p className="leading-relaxed text-foreground/90">{oil.diamond_tip}</p>
            </div>
          )}

          {/* Safety warnings */}
          {oil.safety_warnings.length > 0 && (
            <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-5">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-destructive">
                <AlertTriangle className="h-5 w-5" />
                주의사항
              </h3>
              <ul className="space-y-2">
                {oil.safety_warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
