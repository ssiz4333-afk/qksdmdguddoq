'use client'

import { Sparkles, Check, ArrowRight } from 'lucide-react'

export function SubscriptionCTA() {
  const benefits = [
    '무제한 AI 오일 추천',
    '프리미엄 블렌딩 레시피',
    '1:1 전문가 상담',
    '신제품 우선 안내',
  ]

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/90 p-8 text-primary-foreground shadow-2xl shadow-primary/30 md:p-12">
          {/* Decorative elements */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
          <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-primary-foreground/5 blur-[60px]" />
          
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>프리미엄 멤버십</span>
            </div>

            <h2 className="mb-5 text-balance text-2xl font-bold md:text-4xl">
              더 깊이 있는 아로마테라피 여정을
              <br />
              함께 하세요
            </h2>

            <p className="mb-10 max-w-xl text-pretty text-primary-foreground/80 md:text-lg">
              doTERRA 다이아몬드 리더의 전문 지식과 함께하는 프리미엄 멤버십.
              맞춤형 오일 추천부터 1:1 상담까지 모든 혜택을 누려보세요.
            </p>

            <ul className="mb-10 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 font-bold text-primary shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
                멤버십 시작하기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="rounded-xl border-2 border-primary-foreground/30 px-8 py-4 font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10">
                자세히 알아보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
