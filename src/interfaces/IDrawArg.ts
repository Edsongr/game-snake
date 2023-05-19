import { IPosition } from "./IPosition"

export interface IDrawArg {
    ctx: CanvasRenderingContext2D,
    snakeBody: IPosition[],
    foodPosition?: IPosition
}