import { useState } from 'react'
import useTime from './useTime'
import themes from './themes'   // ← import array มา
import './App.css'

function App() {
  const time = useTime()

  // ① state เก็บ theme object ทั้งก้อน (เริ่มที่ตัวแรกใน array)
  const [theme, setTheme] = useState(themes[0])

  const hours   = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')

  const days = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์']
  const dateStr = `วัน${days[time.getDay()]}  ${time.toLocaleDateString('th-TH')}`

  // ② CSS Variables ใส่ผ่าน inline style บน wrapper
  const cssVars = {
    '--bg':     theme.bg,
    '--card':   theme.card,
    '--text':   theme.text,
    '--glow':   theme.glow,
    '--border': theme.border,
    '--sub':    theme.sub,
  }

  return (
    <div className="wrapper" style={cssVars}>
      <p className="date-label">{dateStr}</p>

      <div className="clock">
        <span>{hours}</span>
        <span className="colon">:</span>
        <span>{minutes}</span>
        <span className="colon">:</span>
        <span>{seconds}</span>
      </div>

      {/* ③ วน .map() สร้างปุ่มจาก array */}
      <div className="theme-picker">
        {themes.map(t => (
          <button
            key={t.id}
            className={`theme-btn ${theme.id === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t)}
            title={t.name}
          >
            {t.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App