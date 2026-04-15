'use client'

import { Brain, Moon, Activity, Shield, Leaf, Sparkles } from 'lucide-react'
import { CATEGORIES } from '@/lib/types'

interface CategoryGridProps {
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  stress: <Brain className="h-6 w-6" />,
  sleep: <Moon className="h-6 w-6" />,
  pain: <Activity className="h-6 w-6" />,
  immunity: <Shield className="h-6 w-6" />,
  digestion: <Leaf className="h-6 w-6" />,
  skin: <Sparkles className="h-6 w-6" />,
}

export function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-xl font-semibold text-foreground md:text-2xl">
          카테고리별 탐색
        </h2>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(isSelected ? null : category.id)}
                className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-transparent bg-card shadow-sm hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary/50 text-primary group-hover:bg-primary/20'
                }`}>
                  {categoryIcons[category.id]}
                </div>
                <div>
                  <span className={`block text-sm font-semibold transition-colors ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {category.description}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
