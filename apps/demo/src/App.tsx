import type { SidebarMenuItem } from '@mining-sdk/core'
import { Sidebar } from '@mining-sdk/core'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { COMPONENT_NAV } from './constants/navigation'
import './App.scss'

const App = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const activeSection = location.pathname === '/' ? '' : location.pathname.slice(1)

  const handleNavClick = (item: SidebarMenuItem): void => {
    navigate(`/${item.id}`)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredNav = useMemo(() => {
    if (!searchQuery.trim()) {
      return COMPONENT_NAV
    }

    const query = searchQuery.toLowerCase().trim()

    return COMPONENT_NAV.map((section) => {
      if (!section.items) {
        return section.label.toLowerCase().includes(query) ? section : null
      }

      const filteredItems = section.items.filter((item) => item.label.toLowerCase().includes(query))

      if (filteredItems.length === 0 && !section.label.toLowerCase().includes(query)) {
        return null
      }

      return {
        ...section,
        items: filteredItems.length > 0 ? filteredItems : section.items,
      }
    }).filter(Boolean) as SidebarMenuItem[]
  }, [searchQuery])

  const searchHeader = (
    <div className="demo-app__search">
      <MagnifyingGlassIcon className="demo-app__search-icon" />
      <input
        type="text"
        placeholder="Search components..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="demo-app__search-input"
      />
      {searchQuery && (
        <button
          className="demo-app__search-clear"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )

  return (
    <div className="demo-app">
      <Sidebar
        items={filteredNav}
        activeId={activeSection}
        onItemClick={handleNavClick}
        defaultExpanded={!!searchQuery}
        header={searchHeader}
        className="demo-app__nav"
      />
      <main className="demo-app__main" ref={mainRef}>
        <div className="demo-app__content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
