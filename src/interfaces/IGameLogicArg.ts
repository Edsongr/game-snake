import { GameState } from "../Utils/GameState";

export interface IGameLogicArg {
    canvasWidth?: number, 
    canvasHeight?: number, 
    onGameOver: () => void,
    gameState: GameState
}