import { IRandonPosition } from "../interfaces/IRandomPosition";

const RandomPosition = ({
    gridSize = 5,
    threshold,
  }: IRandonPosition) =>
    Math.floor(Math.random() * (threshold / gridSize)) * gridSize;
  
  export default RandomPosition;