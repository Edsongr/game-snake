import React, { forwardRef, useEffect } from "react"
import { Canvas } from "../styles/Canvas.styles"


type CanvasProps = React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>, 
    HTMLCanvasElement> & {
        draw: (context: CanvasRenderingContext2D) => void
    }

const SnakeCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
    ({draw, ...props}, snakeCanvasRef) => {

        useEffect(() => {

            if (!snakeCanvasRef) 
                return

            const canvas = (snakeCanvasRef as React.RefObject<HTMLCanvasElement>).current
            if (!canvas)
                return

            const context = canvas.getContext('2d')
            if (!context) 
                return;
            
            draw(context)

            return () => context.clearRect(0, 0, window.innerWidth, 400);
        }, [draw, snakeCanvasRef]) 

        if (!snakeCanvasRef) 
            return null

        return (
            <Canvas  
                width={300}
                height={150}
                ref={snakeCanvasRef as any}
                {...props}
            />
        )

    }
)

export default SnakeCanvas