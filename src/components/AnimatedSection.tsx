'use client'

import { useRef, ReactNode, useMemo } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

// Define animation variants for better performance
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export function FadeUp({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const transition = useMemo(() => ({
    duration: 0.6,
    delay,
    ease: [0.25, 0.4, 0.25, 1]
  }), [delay])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={transition}
      className={className}
      style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}

export function SlideUp({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const transition = useMemo(() => ({
    duration: 0.5,
    delay,
    ease: 'easeOut'
  }), [delay])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideUpVariants}
      transition={transition}
      className={className}
      style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const transition = useMemo(() => ({
    duration: 0.8,
    delay
  }), [delay])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={transition}
      className={className}
      style={{ willChange: isInView ? 'opacity' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}
