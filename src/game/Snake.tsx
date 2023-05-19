import React, { useRef, useState } from "react"
import { IGameProps } from "../interfaces/IGameProps"
import { GameState } from "../Utils/GameState"
import SnakeCanvas from "./SnakeCanvas"
import useGameLogic from "./UseGameSnakeLogic"

import draw from "./Draw"
import { GameWrapper } from "../styles/Game.styles"

import * as TXT from "../Utils/Text"

const Snake: React.FC<IGameProps> = () => {

    const [gameState, setGameState] = useState<GameState>(GameState.START)
    const snakeCanvasRef = useRef<HTMLCanvasElement>(null)

    const onGameOver = () => setGameState(GameState.GAME_OVER)

    const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } = 
        useGameLogic({
            canvasHeight: 150,
            canvasWidth: 300,
            onGameOver,
            gameState
        })

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ctx, snakeBody, foodPosition})
    }

    return (
        <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>

            <SnakeCanvas ref={snakeCanvasRef} draw={drawGame} />

            {gameState === GameState.GAME_OVER ? (
                <button
                    onClick={ () => { setGameState( GameState.START ); resetGameState(); } }
                >
                    { TXT.PLAY_AGAIN }
                </button>
            ) : (
                <button
                    onClick={() => {
                        setGameState(gameState === GameState.START ? GameState.PAUSED : GameState.START)
                    }}
                >
                    {gameState === GameState.PAUSED ? TXT.PLAY: TXT.PAUSE}
                </button>
            )}
        
        </GameWrapper>
    )
}

export default Snake