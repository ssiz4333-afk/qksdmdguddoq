'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HeroSection } from '@/components/hero-section'
import { CategoryGrid } from '@/components/category-grid'
import { OilList } from '@/components/oil-list'
import { OilModal } from '@/components/oil-modal'
import { SubscriptionCTA } from '@/components/subscription-cta'
import { Footer } from '@/components/footer'
import type { Oil } from '@/lib/types'

export default function HomePage() {
  const [oils, setOils] = useState<Oil[]>([])
  const [filteredOils, setFilteredOils] = useState<Oil[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOil, setSelectedOil] = useState<Oil | null>(null)

  const supabase = createClient()

  // Fetch all oils on mount
  useEffect(() => {
    async function fetchOils() {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('oils')
        .select('*')
        .order('name_ko')

      if (error) {
        console.error('[v0] Error fetching oils:', error)
      } else {
        setOils(data || [])
        setFilteredOils(data || [])
      }
      setIsLoading(false)
    }

    fetchOils()
  }, [])

  // Filter oils based on search query and category
  const filterOils = useCallback(() => {
    let result = oils

    // Filter by category
    if (selectedCategory) {
      result = result.filter((oil) => oil.category === selectedCategory)
    }

    // Filter by search query (check symptoms, name, description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((oil) => {
        const nameMatch = oil.name_ko.toLowerCase().includes(query) || 
                          oil.name_en.toLowerCase().includes(query)
        const descMatch = oil.description.toLowerCase().includes(query)
        const symptomMatch = oil.symptoms.some(s => s.toLowerCase().includes(query))
        return nameMatch || descMatch || symptomMatch
      })
    }

    setFilteredOils(result)
  }, [oils, selectedCategory, searchQuery])

  useEffect(() => {
    filterOils()
  }, [filterOils])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Clear category when searching
    if (query.trim()) {
      setSelectedCategory(null)
    }
  }

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // Clear search when selecting category
    if (categoryId) {
      setSearchQuery('')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onSearch={handleSearch} />
      <CategoryGrid 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      <OilList 
        oils={filteredOils} 
        isLoading={isLoading} 
        onSelectOil={setSelectedOil} 
      />
      <SubscriptionCTA />
      <Footer />
      <OilModal oil={selectedOil} onClose={() => setSelectedOil(null)} />
    </main>
  )
}
