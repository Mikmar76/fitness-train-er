import { useState } from 'react'

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{maxWidth: '500px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', fontSize: '2.5rem', margin: '20px 0'}}>
          💪 Fitness Trainer
        </h1>
        
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap'}}>
          {['home', 'workouts', 'nutrition', 'analytics', 'ai'].map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '8px',
                background: tab === t ? '#fff' : 'rgba(255,255,255,0.2)',
                color: tab === t ? '#667eea' : 'white',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {t === 'home' ? '🏠' : 
               t === 'workouts' ? '💪' :
               t === 'nutrition' ? '🥗' :
               t === 'analytics' ? '📊' : '🤖'} {t}
            </button>
          ))}
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '30px',
          borderRadius: '20px',
          minHeight: '300px'
        }}>
          <h2>
            {tab === 'home' ? '🏠 Главная' : 
             tab === 'workouts' ? '💪 Тренировки' :
             tab === 'nutrition' ? '🥗 Питание' :
             tab === 'analytics' ? '📊 Аналитика' : '🤖 AI Коуч'}
          </h2>
          <p>Добро пожаловать в твой фитнес-трекер!</p>
        </div>
      </div>
    </div>
  )
}

export default App
