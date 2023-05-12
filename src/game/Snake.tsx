import React, { useState } from "react";
import { IGameProps } from "../interfaces/IGameProps";
import { GameState } from "./GameState";
import { GameWrapper } from "../styles/Game.styles";
import * as TXT from "../Utils/Text";

const Snake: React.FC<IGameProps> = () => {

    const [gameState, setGameState] = useState<GameState>(GameState.START);

    return (
        <GameWrapper>

            {gameState === GameState.GAME_OVER ? (
                <button
                    onClick={ () => { setGameState( GameState.START ) } }
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

export default Snake;