import { Engine, Color, vec, Label, Font } from 'excalibur';

export class GameMain extends Engine {
  
  constructor() {
    super({ width: 800, height: 600 });

     // Create a new Label
     const label = new Label({
      text: `Hello World!`,
      color: Color.Red,
      pos: vec(300, 300),
      font: new Font({ size: 30 })
    });

    // Add the Label to the current scene
    this.add(label);
  }

  public startGame(): void {
    super.start();
  }
}