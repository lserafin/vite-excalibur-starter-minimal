import { Actor, CollisionType, Color, Engine, Vector, CollisionStartEvent } from 'excalibur';
import { Paddle } from './paddle';

export class Ball extends Actor {
  private ballSpeed: Vector;
  private colliding: boolean = false;

  constructor(engine: Engine, ballSpeed: Vector) {
    super({
      x: 100,
      y: 300,
      radius: 10,
      color: Color.Red,
    });

    this.body.collisionType = CollisionType.Passive;
    this.ballSpeed = ballSpeed;
  }

  public serve(): void {
    setTimeout(() => {
      this.vel = this.ballSpeed.clone();
    }, 1000);
  }
  
  public onCollisionStart(ev: CollisionStartEvent, bricks: Actor[]): void {
    if (bricks.indexOf(ev.other) > -1) {
      ev.other.kill();
    }

    const intersection = ev.contact.mtv.normalize();

    if (!this.colliding) {
      this.colliding = true;
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    }    
  }

  public onCollisionEnd(): void {
    this.colliding = false;
  }

  public update(engine: Engine, delta: number): void {
    super.update(engine, delta);

    // If the ball collides with the left side of the screen, reverse the x velocity
    if (this.pos.x < this.width / 2) {
      this.vel.x = this.ballSpeed.x;
    }

    // If the ball collides with the right side of the screen, reverse the x velocity
    if (this.pos.x + this.width / 2 > engine.drawWidth) {
      this.vel.x = -this.ballSpeed.x;
    }

    // If the ball collides with the top of the screen, reverse the y velocity
    if (this.pos.y < this.height / 2) {
      this.vel.y = this.ballSpeed.y;
    }
  }

  public onCollisionWithPaddle(paddle: Paddle): void {
    if (this.collides(paddle)) {
      this.vel.y *= -1;
    }
  }
}
