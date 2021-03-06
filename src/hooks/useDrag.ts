import { useState, useEffect } from "react"
// 相对点击时移动的距离
function useDrag(ref: React.RefObject<HTMLElement>) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 })
  const [isDrag, setIsDrag] = useState(false)
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const startX = event.clientX
      const startY = event.clientY
      setOffset({ dx: 0, dy: 0 })
      setIsDrag(true)
      const handleMouseMove = (event: MouseEvent) => {
        const moveX = event.clientX - startX
        const moveY = event.clientY - startY
        setOffset({ dx: moveX, dy: moveY })
      }
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", () => {
        setIsDrag(false)
        document.removeEventListener("mousemove", handleMouseMove)
      })
    }
    if (ref.current) {
      ref.current.addEventListener("mousedown", handleMouseDown)
    }
    return () => {
      ref.current && ref.current.removeEventListener("mousedown", handleMouseDown)
    }
  }, [dx, dy])
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `transform3d(${dx},${dy},0)`
    }
  }, [dx, dy])
  return { dx, dy, isDrag }
}
export default useDrag
