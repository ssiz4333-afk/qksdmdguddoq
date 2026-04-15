# AromaGuide (AI Aroma Master) 개발 계획서

본 문서는 v0.dev에서 생성된 기초 프로젝트를 바탕으로, 실제 서비스 가능한 **AI 에센셜 오일 상담 플랫폼**으로 발전시키기 위한 개발 계획을 담고 있습니다.

---

## 🏗️ 1. 프로젝트 개요

### 기술 스택
- **Framework**: Next.js 16.2 (App Router) / React 19
- **UI/UX**: Shadcn UI + Tailwind CSS v4 + Lucide Icons
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Hooks (useState, useEffect)
- **Deployment**: Vercel (예정)

### 주요 폴더 구조 요약
- `/app`: 페이지 경로 및 레이아웃 (`globals.css`, `layout.tsx`, `page.tsx`)
- `/components`: 기능별 컴포넌트 (`hero-section`, `oil-list`, `oil-modal` 등)
- `/components/ui`: Shadcn 기반 기초 UI 소스 (40+개 원자 수준 컴포넌트)
- `/hooks`: 반응형 상태 및 UI 로직 (`use-mobile.ts`, `use-toast.ts`)
- `/lib`: 공통 유틸리티, 타입 정의 및 Supabase 설정 (`supabase/`, `types.ts`, `utils.ts`)
- `/scripts`: DB 스키마 정의 및 초기 데이터 삽입용 SQL
- `/public`: 각종 이미지 및 정적 리소스
- `/styles`: 전역 CSS 스타일링 (`globals.css`)

---

## ✅ 2. 현재 구현된 항목 (v0.dev 기반)

- [x] **메인 레이아웃**: 상단 히어로 섹션, 하단 푸터, 반응형 레이아웃 적용
- [x] **검색 기능**: 증상 기반 키워드 검색 로직 (`HeroSection` 연동)
- [x] **카테고리 필터**: 싱글/블렌드 등 카테고리별 필터링 UI (`CategoryGrid`)
- [x] **오일 리스트**: 오일 카드 그리드 뷰 및 스켈레톤 로딩 구현
- [x] **상세 보기 (모달)**: 개별 오일 클릭 시 상세 사양(효능, 용법, 주의사항) 팝업
- [x] **초기 스키마 설계**: `oils` 테이블 생성을 위한 SQL 스크립트 작성됨
- [x] **기본 다크 모드**: `next-themes`를 통한 시스템 테마 지원

---

## 🚀 3. 앞으로 개발할 항목 (Roadmap)

### 핵심 기능 추가
- [ ] **AI 챗봇 상담**: OpenAI/Anthropic API를 연동하여 더 구체적인 맞춤형 상담 기능 구현
- [ ] **사용자 인증 (Auth)**: Supabase Auth를 통한 로그인/회원가입 기능 (자신의 오일 리스트 관리)
- [ ] **리뷰 및 평점**: 사용자가 오일을 직접 사용해본 후기 및 평점 남기기
- [ ] **구매 연동**: 도테라 사이트 혹은 자체 쇼핑몰 링크 연결 기능

### 기술적 고도화
- [ ] **데이터 정규화**: `oils` 데이터를 더 풍부하게 보강 (100개 이상의 실제 도테라 데이터 수집)
- [ ] **이미지 최적화**: 모든 플레이스홀더 이미지를 고해상도 실제 제품 이미지로 교체
- [ ] **실시간 알림**: 새로운 상담 요청이나 공지사항 푸시 알림

---

## 🧩 4. 페이지/컴포넌트 구조 및 역할

| 이름 | 역할 | 파일 경로 |
|:---|:---|:---|
| `HomePage` | 메인 페이지의 전체 상태(오일 데이터, 필터) 관리 및 렌더링 | `app/page.tsx` |
| `HeroSection` | 서비스 소개, 주요 증상 검색 및 인기 키워드 제공 | `components/hero-section.tsx` |
| `OilList` | 필터링된 오일들의 그리드 뷰 출력 및 로딩 상태 처리 | `components/oil-list.tsx` |
| `OilModal` | 오일의 상세 데이터(용법, 주의사항 등)를 집중도 있게 표현 | `components/oil-modal.tsx` |
| `Supabase Client`| DB와의 통신을 위한 API 계층 (Auth 제외) | `lib/supabase/client.ts` |
| `Types` | 프로젝트 전역에서 사용되는 Oil, Category 등 인터페이스 정의 | `lib/types.ts` |
| `useMobile` | 뷰포트 크기에 따른 모바일 여부 판단 후 UI 분기 처리 | `hooks/use-mobile.ts` |

---

## 🔄 5. 데이터 흐름

1. **초기화**: `HomePage` 마운트 시 Supabase `oils` 테이블에서 전체 데이터를 fetch (`useEffect`)
2. **필터링**:
    - 검색창 입력 → `searchQuery` 상태 업데이트 → `useCallback` 필터링 함수 실행 → `filteredOils` 업데이트
    - 카테고리 클릭 → `selectedCategory` 상태 업데이트 → 필터링 함수 실행
3. **상세 정보**: 오일 카드 클릭 → `selectedOil` 상태에 해당 객체 전달 → `OilModal` 오픈

---

## 📅 6. 개발 우선순위 (Phases)

### Phase 1: 기반 다지기 (현재 완료 중)
- [ ] Supabase SQL 스크립트 실행하여 실제 DB 구성하기
- [ ] 실제 도테라 오일 데이터 10~20개 이상 Seed 데이터로 삽입

### Phase 2: AI 기능 강화
- [ ] 증상 검색 기능을 벡터 검색(Vector Search) 혹은 LLM 임베딩 기반으로 업그레이드
- [ ] 간단한 AI 답변 섹션 추가

### Phase 3: 사용자 경험(UX) 완성
- [ ] 이미지 최적화 및 로딩 성능 개선
- [ ] 검색 결과 없을 시 피드백 UI 추가
- [ ] 모바일 터치 인터렉션(스와이프 등) 보강

---

**작성일**: 2026. 04. 15.
**작성자**: Antigravity AI Consultant
