'use client'

import { Droplet } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Droplet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AromaGuide</span>
          </div>
          
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            본 서비스는 정보 제공 목적으로만 사용되며, 의료적 조언을 대체하지 않습니다.
            건강 관련 결정을 내리기 전에 전문가와 상담하세요.
          </p>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">이용약관</a>
            <a href="#" className="transition-colors hover:text-primary">개인정보처리방침</a>
            <a href="#" className="transition-colors hover:text-primary">문의하기</a>
          </div>

          <div className="h-px w-full max-w-xs bg-border" />

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AromaGuide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
