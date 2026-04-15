'use client'

import { useState } from 'react'
import { Search, Sparkles, Droplet } from 'lucide-react'

interface HeroSectionProps {
  onSearch: (query: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const popularSymptoms = ['두통', '불면증', '스트레스', '근육통', '소화불량']

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-12 md:pb-12 md:pt-20">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-secondary/40 blur-[100px]" />
        <div className="absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
            <Droplet className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">AromaGuide</span>
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>doTERRA 다이아몬드 리더 추천</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          나에게 맞는
          <span className="mt-2 block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            에센셜 오일
          </span>
          찾기
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
          증상을 입력하면 AI가 최적의 에센셜 오일과 사용법을 추천해드립니다.
          전문가의 지식을 담은 맞춤형 아로마테라피 가이드
        </p>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="증상을 입력하세요 (예: 두통, 불면증, 스트레스)"
              className="h-16 w-full rounded-2xl border-2 border-border bg-card pl-14 pr-5 text-base shadow-xl shadow-foreground/5 transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </form>

        {/* Popular symptoms */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">인기 검색:</span>
          {popularSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => {
                setSearchQuery(symptom)
                onSearch(symptom)
              }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
