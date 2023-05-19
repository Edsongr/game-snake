import { Direction } from "../Utils/Direction" 
import { IPosition } from "../interfaces/IPosition"
import { ISnakeHitFood } from "../interfaces/ISnakeHitFood"

const createSnakeMovement = (gridSize = 5) => ({

    moveRight: (snakeBody: IPosition[]) => {
        
        const copyBody = [...snakeBody]
        const headPos = copyBody[copyBody.length - 1]
        copyBody.shift() 

        return [...copyBody, {...headPos, x:headPos.x + gridSize}]
    },

    moveLeft: (snakeBody: IPosition[]) => {
        
        const copyBody = [...snakeBody]
        const headPos = copyBody[copyBody.length - 1]
        copyBody.shift() 

        return [...copyBody, {...headPos, x:headPos.x - gridSize}]
    },

    moveUp: (snakeBody: IPosition[]) => {
        
        const copyBody = [...snakeBody]
        const headPos = copyBody[copyBody.length - 1]
        copyBody.shift() 

        return [...copyBody, {...headPos, y:headPos.y - gridSize}]
    },

    moveDown: (snakeBody: IPosition[]) => {
        
        const copyBody = [...snakeBody]
        const headPos = copyBody[copyBody.length - 1]
        copyBody.shift() 

        return [...copyBody, {...headPos, y:headPos.y + gridSize}]
    },

})

export const SnakeHitFood = ({foodPosition, snakeHeadPosition, direction}: ISnakeHitFood) => {

    switch (direction) {
        case Direction.UP:
            return (
                foodPosition.x === snakeHeadPosition.x && 
                snakeHeadPosition.y - 5 === foodPosition.y
            )
        case Direction.DOWN:
            return (
                foodPosition.x === snakeHeadPosition.x && 
                snakeHeadPosition.y + 5 === foodPosition.y
            )
        case Direction.LEFT:
            return (
                foodPosition.y === snakeHeadPosition.y && 
                snakeHeadPosition.x - 5 === foodPosition.x
            )
        case Direction.RIGHT:
            return (
                foodPosition.y === snakeHeadPosition.y && 
                snakeHeadPosition.x + 5 === foodPosition.x
            )
           
    }

}

export const SnakeHitItself = (snakeBody: IPosition[]) => {

    if (snakeBody.length <= 1)
        return false

    const head = snakeBody[snakeBody.length - 1]
    const body = snakeBody.slice(0, snakeBody.length -1)

    return body.some( (segment) => segment.x === head.x && segment.y === head.y );
}

export default createSnakeMovement