import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Resting.css'

// 数字转中文
function toChineseNumber(num) {
    const chineseDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

    if (num === 0) return '零'
    if (num === 10) return '十'
    if (num < 10) return chineseDigits[num]

    if (num < 100) {
        const tens = Math.floor(num / 10)
        const ones = num % 10
        if (tens === 1) {
            return ones === 0 ? '十' : '十' + chineseDigits[ones]
        }
        return chineseDigits[tens] + '十' + (ones === 0 ? '' : chineseDigits[ones])
    }

    return String(num)
}

function Resting({ minutes, onComplete }) {
    // 使用 useRef 确保只初始化一次
    const initialSeconds = useRef(minutes * 60)
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds.current)

    useEffect(() => {
        if (secondsLeft <= 0) {
            onComplete && onComplete()
            return
        }

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [secondsLeft, onComplete])

    // 计算分钟、秒（最多60分钟）
    const mins = Math.floor(secondsLeft / 60)
    const secs = secondsLeft % 60

    return (
        <div className="resting-page">
            <motion.div
                className="countdown-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* 分钟 - 竖排 */}
                {mins > 0 && (
                    <div className="time-row">
                        <span className="countdown-text">{toChineseNumber(mins)}</span>
                        <span className="countdown-unit">分</span>
                    </div>
                )}

                {/* 秒 - 竖排 */}
                <div className="time-row">
                    <span className="countdown-text">{toChineseNumber(secs)}</span>
                    <span className="countdown-unit">秒</span>
                </div>
            </motion.div>
        </div>
    )
}

export { toChineseNumber }
export default Resting
