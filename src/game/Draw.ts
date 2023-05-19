import { IPosition } from "../interfaces/IPosition";
import { IDrawArg } from "../interfaces/IDrawArg";
import { SEGMENT_SIZE } from "../Utils/ConfigGame";

const draw = ({ ctx, snakeBody, foodPosition }: IDrawArg) => {

    if (foodPosition) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
        ctx.fillRect(foodPosition?.x, foodPosition?.y, SEGMENT_SIZE, SEGMENT_SIZE);
    }

    ctx.fillStyle = 'rgb(200, 0, 0)';
    snakeBody.forEach((segment) => 
        ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
    );

}

export default draw;