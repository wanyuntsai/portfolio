import { motion } from 'framer-motion';

// fade in animation
export function FadeInSection({ children, delay = 0}) {
    return (
        <motion.div
            initial={{ opacity:0, y: 30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-50px'}}
            transition={{duration: 0.6, delay, ease:"easeOut"}}
        >
            {children}
        </motion.div>    
    );
}

// page transition
export function PageTransition({ children }) {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5, ease:"easeOut"
            }}
        >
            {children}
        </motion.div>
    );
}