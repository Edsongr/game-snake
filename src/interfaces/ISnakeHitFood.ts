import { Direction } from "../Utils/Direction"
import { IPosition } from "./IPosition"

export interface ISnakeHitFood {
    foodPosition: IPosition,
    snakeHeadPosition: IPosition,
    direction: Direction
}
