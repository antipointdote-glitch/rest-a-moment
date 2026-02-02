import { motion } from 'framer-motion'
import './Goodbye.css'

function Goodbye({ onClose }) {
    return (
        <div className="goodbye-page">
            <motion.div
                className="goodbye-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="goodbye-text">再见</h1>

                <motion.button
                    className="back-home-button"
                    onClick={onClose}
                    whileHover={{ opacity: 0.4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    回首页
                </motion.button>
            </motion.div>
        </div>
    )
}

export default Goodbye
