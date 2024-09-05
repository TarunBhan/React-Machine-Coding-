import { useMemo, useState } from "react"
import Star from "./StarIcon"
const total = 5, activeStar = 2
const StarComponent = () => {
    const [starIndex, setStarIndex] = useState()
    const [rating, setRating] = useState(activeStar)
    const totalArray = useMemo(() => Array.from({ length: total }), [total])
    const handleMouseEnter = (event) => {

        if (rating > event.target?.dataset?.starId) { return; }
        setStarIndex(event.target?.dataset?.starId)
    }
    const onMouseLeave = () => {
        setStarIndex(0)
    }
    const handleStarClick = (event) => {
        setRating(event.target.dataset.starId)
    }
    return (
        <div className="flex w-40 h-14 border-2 border-black" onMouseOver={handleMouseEnter} onMouseLeave={onMouseLeave} onClick={handleStarClick}>
            {totalArray.map((_, index) => {
                return (
                    <Star marked={(Math.max(starIndex || rating)) > index
                    } starId={index + 1} />
                )
            })}
        </div>
    )
}
export default StarComponent