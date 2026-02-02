import { useState } from 'react'
import { motion } from 'framer-motion'
import './TimerSetup.css'

// 数字转中文
function toChineseNumber(num) {
    const chineseDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

    if (num === 0 || num === '') return ''
    const n = parseInt(num)
    if (isNaN(n)) return ''
    if (n === 10) return '十'
    if (n < 10) return chineseDigits[n]

    if (n < 100) {
        const tens = Math.floor(n / 10)
        const ones = n % 10
        if (tens === 1) {
            return ones === 0 ? '十' : '十' + chineseDigits[ones]
        }
        return chineseDigits[tens] + '十' + (ones === 0 ? '' : chineseDigits[ones])
    }

    if (n < 1000) {
        const hundreds = Math.floor(n / 100)
        const remainder = n % 100
        let result = chineseDigits[hundreds] + '百'
        if (remainder === 0) return result
        if (remainder < 10) return result + '零' + chineseDigits[remainder]
        return result + toChineseNumber(remainder)
    }

    return String(n)
}

function TimerSetup({ onStart, onBack }) {
    const [minutes, setMinutes] = useState('')

    const handleInputChange = (e) => {
        const value = e.target.value
        // 允许空值和数字
        if (value === '' || /^\d+$/.test(value)) {
            setMinutes(value)
        }
    }

    const handleBlur = () => {
        // 失去焦点时验证范围（1秒到60分钟）
        if (minutes === '') return
        const num = parseInt(minutes) || 1
        setMinutes(String(Math.max(1, Math.min(60, num))))
    }

    const handleStart = () => {
        const num = parseInt(minutes) || 10
        if (onStart) onStart(num)
    }

    const chineseMinutes = minutes === '' ? '' : toChineseNumber(minutes)

    return (
        <div className="timer-page">
            <div className="timer-content">
                {/* 时间设置区域 */}
                <motion.div
                    className="input-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="time-input-row">
                        <span>歇</span>
                        <div className="chinese-input-wrapper">
                            <span className="chinese-display">
                                {chineseMinutes}
                            </span>
                            <input
                                type="text"
                                className="time-input-hidden"
                                value={minutes}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputMode="numeric"
                                autoFocus
                            />
                        </div>
                        <span>分钟</span>
                    </div>

                    <motion.button
                        className="start-button"
                        onClick={handleStart}
                        whileHover={{ opacity: 0.4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        开始
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default TimerSetup
