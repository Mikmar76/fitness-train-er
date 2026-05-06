import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ color: '#00f7ff' }}>FITNESS</span><span style={{ color: '#ff6b35' }}>PRO</span>
        </h1>
        
        <div style={{ marginBottom: '20px' }}>
          {['home', 'workouts', 'nutrition', 'analytics', 'ai-chat'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 15px',
                margin: '5px',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === tab ? '#00f7ff' : 'rgba(255,255,255,0.1)',
                color: activeTab === tab ? '#0f172a' : 'white',
                cursor: 'pointer'
              }}
            >
              {tab === 'home' ? '🏠 Главная' : 
               tab === 'workouts' ? '💪 Тренировки' :
               tab === 'nutrition' ? '🥗 Питание' :
               tab === 'analytics' ? '📊 Аналитика' : '🤖 AI Коуч'}
            </button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h2>🏠 Главная</h2>
            <p>Добро пожаловать в твой фитнес-трекер!</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
              <div style={{ background: 'white', color: '#333', padding: '15px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>72.5</div><div>Вес (кг)</div></div>
              <div style={{ background: 'white', color: '#333', padding: '15px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>12</div><div>Тренировок</div></div>
              <div style={{ background: 'white', color: '#333', padding: '15px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>85%</div><div>Цель</div></div>
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h2>💪 Тренировки</h2>
            <p>Здесь будут твои тренировки!</p>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h2>🥗 Питание</h2>
            <input placeholder="Поиск продуктов..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', marginBottom: '10px' }} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h2>📊 Аналитика</h2>
            <p>Графики и прогресс!</p>
          </div>
        )}

        {activeTab === 'ai-chat' && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
            <h2>🤖 AI Коуч</h2>
            <div style={{ height: '200px', background: '#1e293b', borderRadius: '10px', padding: '10px', marginBottom: '10px', overflowY: 'auto' }}>
              <div style={{ background: '#00f7ff', color: '#0f172a', padding: '8px', borderRadius: '10px', marginBottom: '5px', alignSelf: 'flex-end' }}>Привет! Я твой ИИ-тренер.</div>
            </div>
            <input placeholder="Твой вопрос..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
