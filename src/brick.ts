import { Actor, CollisionType, Color } from 'excalibur';

export class Brick extends Actor {
  constructor(x: number, y: number, width: number, height: number, color: Color) {
    super({ x, y, width, height, color });
    
    this.body.collisionType = CollisionType.Active;
  }
}