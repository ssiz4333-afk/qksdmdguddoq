'use client'

import { Leaf } from 'lucide-react'
import { OilCard } from './oil-card'
import type { Oil } from '@/lib/types'

interface OilListProps {
  oils: Oil[]
  isLoading: boolean
  onSelectOil: (oil: Oil) => void
}

export function OilList({ oils, isLoading, onSelectOil }: OilListProps) {
  if (isLoading) {
    return (
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-3xl bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (oils.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/50">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-foreground">
            검색 결과가 없습니다
          </h3>
          <p className="text-muted-foreground">
            다른 증상이나 카테고리로 검색해보세요.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            추천 에센셜 오일
            <span className="ml-3 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {oils.length}개
            </span>
          </h2>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {oils.map((oil) => (
            <OilCard
              key={oil.id}
              oil={oil}
              onClick={() => onSelectOil(oil)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
