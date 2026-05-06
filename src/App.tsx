import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Workouts from './components/Workouts'
import Nutrition from './components/Nutrition'
import AIChat from './components/AIChat'
import Analytics from './components/Analytics'
import { 
  HomeIcon, 
  FireIcon, 
  BeakerIcon, 
  ChartBarIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: HomeIcon },
    { id: 'workouts', label: 'Тренировки', icon: FireIcon },
    { id: 'nutrition', label: 'Питание', icon: BeakerIcon },
    { id: 'analytics', label: 'Аналитика', icon: ChartBarIcon },
    { id: 'ai-chat', label: 'AI Коуч', icon: ChatBubbleBottomCenterTextIcon },
  ]

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800/50 backdrop-blur-lg border-r border-cyan-400/20 p-4">
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">FITNESS<span className="text-orange-500">PRO</span></h1>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${activeTab === tab.id ? 'bg-cyan-400/10 text-cyan-400' : 'hover:bg-white/5 text-gray-300'}`}
          >
            <tab.icon className="w-6 h-6" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg z-50 p-4 flex justify-between items-center border-b border-cyan-400/20">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-cyan-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <h1 className="text-xl font-bold text-cyan-400">FITNESS<span className="text-orange-500">PRO</span></h1>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg p-4 pt-20">
          <h1 className="text-2xl font-bold text-cyan-400 mb-8">FITNESS<span className="text-orange-500">PRO</span></h1>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 w-full text-left transition-colors ${activeTab === tab.id ? 'bg-cyan-400/10 text-cyan-400' : 'hover:bg-white/5 text-gray-300'}`}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'workouts' && <Workouts />}
        {activeTab === 'nutrition' && <Nutrition />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'ai-chat' && <AIChat />}
      </div>
    </div>
  )
}

export default App
