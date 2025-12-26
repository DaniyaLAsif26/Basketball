import './counter-element.css'
import { useState, useEffect, useRef } from 'react'

export default function CounterElement({ icon, label, target, small }) {

    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    let start = 0
                    const duration = 1626;
                    const increment = target / (duration / 26)

                    const counter = setInterval(() => {
                        start += increment;

                        if (start >= target) {
                            setCount(target)
                            clearInterval(counter)
                        }
                        else {
                            setCount(Math.ceil(start))
                        }
                    }, 26)
                }
            }
        )
        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [target])

    return (
        <div className={`counter-element ${small && 'small'}`} ref={ref}>
            <div className="">{icon}</div>
            <div className="counter-count">{count}+</div>
            <div className="counter-label">{label}</div>

        </div>
    )
}