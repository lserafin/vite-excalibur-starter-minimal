import { Engine, Vector, Input, Color, vec } from 'excalibur';
import { Paddle } from './paddle';
import { Ball } from './ball';
import { Brick } from './brick';

export class GameMain extends Engine {
  private paddle: Paddle;
  private ball: Ball;
  private bricks: Brick[] = [];
  
  constructor() {
    super({ width: 800, height: 600 });

    this.paddle = new Paddle(this);
    this.add(this.paddle);

    const ballSpeed = new Vector(100, 100);
    this.ball = new Ball(this, ballSpeed);
    this.add(this.ball);
    
    this.setupBricks();
    this.setupInput();
  }

  private setupBricks(): void {
    // Padding between bricks
    const padding = 20; // px
    const xoffset = 65; // x-offset
    const yoffset = 20; // y-offset
    const columns = 5;
    const rows = 3;
    const brickColor = [Color.Violet, Color.Orange, Color.Yellow];
    
    // Individual brick width with padding factored in
    const brickWidth = this.drawWidth / columns - padding - padding / columns; // px
    const brickHeight = 30; // px
    
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        const brick = new Brick(
          xoffset + i * (brickWidth + padding) + padding,
          yoffset + j * (brickHeight + padding) + padding,
          brickWidth,
          brickHeight,
          brickColor[j % brickColor.length]
        );
        
        this.bricks.push(brick);
        this.add(brick);
      }
    }
}


  private setupInput(): void {
    this.input.pointers.primary.on('move', (evt: Input.PointerEvent) => {
      this.paddle.moveTo(evt.worldPos.x);
    });
  }

  public startGame(): void {
    this.ball.serve(vec(100, 100));
    super.start();
  }
}