import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import TimerSetup from './pages/TimerSetup'
import Resting from './pages/Resting'
import Goodbye from './pages/Goodbye'

// 页面状态
const PAGES = {
  HOME: 'home',
  TIMER_SETUP: 'timerSetup',
  RESTING: 'resting',
  GOODBYE: 'goodbye'
}

// 页面切换动画配置
const pageVariants = {
  initial: { y: 0 },
  exit: { y: '-100%', transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } }
}

const slideUpVariants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } },
  exit: { y: '-100%', transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } }
}

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME)
  const [restMinutes, setRestMinutes] = useState(10)

  // 导航到时间设置页
  const goToTimerSetup = () => setCurrentPage(PAGES.TIMER_SETUP)

  // 返回首页
  const goToHome = () => setCurrentPage(PAGES.HOME)

  // 开始休息
  const startResting = (minutes) => {
    setRestMinutes(minutes)
    setCurrentPage(PAGES.RESTING)
  }

  // 休息完成 -> 显示再见页
  const onRestComplete = () => {
    setCurrentPage(PAGES.GOODBYE)
  }

  // 关闭再见页 -> 返回首页
  const onGoodbyeClose = () => {
    setCurrentPage(PAGES.HOME)
  }

  return (
    <div className="phone-container">
      <div className="app-container">
        <AnimatePresence mode="sync">
          {/* 首页 */}
          {currentPage === PAGES.HOME && (
            <motion.div
              key="home"
              className="page-wrapper"
              variants={pageVariants}
              initial="initial"
              exit="exit"
            >
              <HomePage onNext={goToTimerSetup} />
            </motion.div>
          )}

          {/* 时间设置页 */}
          {currentPage === PAGES.TIMER_SETUP && (
            <motion.div
              key="timer"
              className="page-wrapper"
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TimerSetup onStart={startResting} onBack={goToHome} />
            </motion.div>
          )}

          {/* 休息倒计时页 */}
          {currentPage === PAGES.RESTING && (
            <motion.div
              key="resting"
              className="page-wrapper"
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Resting minutes={restMinutes} onComplete={onRestComplete} />
            </motion.div>
          )}

          {/* 再见页 */}
          {currentPage === PAGES.GOODBYE && (
            <motion.div
              key="goodbye"
              className="page-wrapper"
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Goodbye onClose={onGoodbyeClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 首页组件
function HomePage({ onNext }) {
  return (
    <>
      {/* 顶部状态栏 (iOS Style) */}
      <div className="status-bar">
        <span className="status-time">9:41</span>
      </div>

      {/* 主内容：垂直排列的汉字 */}
      <main className="main-content">
        <div className="character-stack">
          {['歇', '会', '儿'].map((char, index) => (
            <motion.h1
              key={char}
              className={`character ${char === '歇' ? 'clickable' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={char === '歇' ? { scale: 1.08 } : { scale: 1.02 }}
              whileTap={char === '歇' ? { scale: 0.95 } : {}}
              onClick={char === '歇' ? onNext : undefined}
            >
              {char}
            </motion.h1>
          ))}
        </div>
      </main>

      {/* 边框装饰 */}
      <div className="edge-border"></div>
    </>
  )
}

export default App
