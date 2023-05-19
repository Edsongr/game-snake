import React, { useEffect, useState } from "react"
import { SEGMENT_SIZE, MOVEMENT_SPEED } from "../Utils/ConfigGame"
import RandomPosition from "../Utils/RandomPosition"
import { GameState } from "../Utils/GameState"
import UseInterval from "../Utils/UseInterval"
import { Direction } from "../Utils/Direction"
import createSnakeMovement, {SnakeHitItself, SnakeHitFood} from "./Movement"

import { IPosition } from "../interfaces/IPosition" 
import { IGameLogicArg } from "../interfaces/IGameLogicArg"

const useGameLogic = ({
    canvasWidth,
    canvasHeight,
    onGameOver,
    gameState,
}: IGameLogicArg) => {
    const [direction, setDirection] = useState<Direction|undefined>()
    const [snakeBody, setSnakeBody] = useState<IPosition[]>([
        {x: 0, y:0},
    ]);

    const resetGameState = () => {
        setDirection(undefined)
        setFoodPosition({
            x: RandomPosition({
                gridSize: SEGMENT_SIZE,
                threshold: canvasWidth!,
            }),
            y: RandomPosition({
                gridSize: SEGMENT_SIZE,
                threshold: canvasHeight!,
            }),
        })

        setSnakeBody([
            {
                x: RandomPosition({
                    gridSize:SEGMENT_SIZE,
                    threshold:canvasWidth!,
                }),
                y: RandomPosition({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasHeight!,
                }),
            }
        ])
    }

    const [foodPosition, setFoodPosition] = useState<IPosition|undefined>()
    const snakeHeadPosition = snakeBody[snakeBody.length - 1]; 
    const { moveDown, moveUp, moveLeft, moveRight } = createSnakeMovement();

    useEffect(() => {

        if (!canvasHeight || !canvasWidth) {
            return;
        }

        setFoodPosition({
            x: RandomPosition({
                gridSize:SEGMENT_SIZE,
                threshold:canvasWidth,
            }),
            y:RandomPosition({
                gridSize: SEGMENT_SIZE,
                threshold: canvasHeight,
            }),
        });

        setSnakeBody([
            {
                x: RandomPosition({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasWidth,
                }),
                y: RandomPosition({
                    gridSize:SEGMENT_SIZE,
                    threshold: canvasHeight,
                }),
            },
        ]);

    }, [canvasHeight, canvasWidth]);


    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {

        switch (event.code) {
            case 'KeyS': 
                if (direction !== Direction.UP) 
                    setDirection(Direction.DOWN)
                break;
            case 'KeyW': 
                if (direction !== Direction.DOWN) 
                    setDirection(Direction.UP)
                break;
            case 'KeyD': 
                if (direction !== Direction.LEFT)
                    setDirection(Direction.RIGHT)
                break;
            case 'KeyA':
                if (direction !== Direction.RIGHT)
                    setDirection(Direction.LEFT)
                break;
        }
    };

    const moveSnake = () => {
        
        let snakeBodyAfterMovement: IPosition[] | undefined; 

        switch (direction) {
            case Direction.UP:
                    if (snakeHeadPosition.y > 0) 
                        snakeBodyAfterMovement = moveUp(snakeBody)
                    else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) 
                        setDirection(Direction.LEFT)
                    else 
                        setDirection(Direction.RIGHT)
                break;
            case Direction.DOWN: 
                if (canvasHeight && snakeHeadPosition.y < canvasHeight - SEGMENT_SIZE) 
                    snakeBodyAfterMovement = moveDown(snakeBody)
                else if (canvasWidth && snakeHeadPosition.x < canvasWidth / 2) 
                    setDirection(Direction.LEFT)
                else 
                    setDirection(Direction.RIGHT)
                break;
            case Direction.LEFT: 
                if (snakeHeadPosition.x > 0) 
                    snakeBodyAfterMovement = moveLeft(snakeBody)
                else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) 
                    setDirection(Direction.DOWN)
                else 
                    setDirection(Direction.UP)
                break;
            case Direction.RIGHT: 
                if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE) 
                    snakeBodyAfterMovement = moveRight(snakeBody) 
                else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) 
                    setDirection(Direction.DOWN)
                else 
                    setDirection(Direction.UP)
                break;
        }

        if (snakeBodyAfterMovement) {
            const isGameOver = SnakeHitItself(snakeBodyAfterMovement)

            if (isGameOver) 
                onGameOver()
        }

        if ( direction !== undefined && foodPosition && 
                SnakeHitFood({
                    foodPosition, snakeHeadPosition, direction
                })
            ) {
                setSnakeBody([
                    ...snakeBodyAfterMovement!, 
                    {x: foodPosition.x, y: foodPosition.y}
                ]); 

                setFoodPosition({
                    x: RandomPosition({ threshold: canvasWidth! }),
                    y: RandomPosition({threshold: canvasHeight!}),
                }); 
        } else if (snakeBodyAfterMovement) {
            setSnakeBody(snakeBodyAfterMovement);
        }

    }; 

    UseInterval(
        moveSnake,
        gameState === GameState.START ? MOVEMENT_SPEED : null
    ); 

    return {
        snakeBody,
        onKeyDownHandler,
        foodPosition,
        resetGameState,
    }

}

export default useGameLogic;