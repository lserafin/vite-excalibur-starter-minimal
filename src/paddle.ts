import { Actor, CollisionType, Color, Engine } from 'excalibur';

export class Paddle extends Actor {
  constructor(engine: Engine) {
    super({
      x: 150,
      y: engine.drawHeight - 40,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
    });

    this.body.collisionType = CollisionType.Fixed;
  }

  public moveTo(x: number): void {
    this.pos.x = x;
  }
}
