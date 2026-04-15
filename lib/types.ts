export interface Oil {
  id: string
  name_ko: string
  name_en: string
  description: string
  category: string
  usage_methods: string[]
  usage_recipes: UsageRecipe[]
  safety_warnings: string[]
  synergy_oils: string[]
  symptoms: string[]
  diamond_tip: string
  image_url: string | null
  created_at: string
}

export interface UsageRecipe {
  title: string
  ingredients: string[]
  instructions: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export const CATEGORIES: Category[] = [
  { id: 'stress', name: '스트레스 완화', description: '마음의 평화와 안정' },
  { id: 'sleep', name: '수면 개선', description: '깊고 편안한 수면' },
  { id: 'pain', name: '통증 완화', description: '근육통, 두통 케어' },
  { id: 'immunity', name: '면역력 강화', description: '건강한 면역 시스템' },
  { id: 'digestion', name: '소화 개선', description: '편안한 소화 기능' },
  { id: 'skin', name: '피부 케어', description: '건강하고 빛나는 피부' },
]
