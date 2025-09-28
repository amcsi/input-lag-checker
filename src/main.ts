import './style.css';

interface InputLagResult {
  milliseconds: number;
  frames: number;
}

class InputLagChecker {
  private app: HTMLElement;
  private isMeasuring: boolean = false;
  private colorChangeTime: number = 0;
  private minDelay: number = 1000; // 1 second minimum
  private maxDelay: number = 2000; // 2 seconds maximum
  private gamepadPolling: boolean = false;

  constructor() {
    this.app = document.getElementById('app')!;
    this.init();
  }

  private init(): void {
    this.renderInitialState();
    this.setupEventListeners();
  }

  private renderInitialState(): void {
    this.app.innerHTML = `
      <div class="container">
        <h1>Input Lag Checker</h1>
        <div class="instruction" id="instruction">
          <p>Click the button below to start measuring your input lag</p>
          <p>When the background changes color, click, press any key, or press any gamepad button as quickly as possible</p>
        </div>
        <button id="startButton" class="start-button">Start Test</button>
        <div id="result" class="result hidden"></div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const startButton = document.getElementById('startButton')!;
    startButton.addEventListener('click', () => this.startMeasurement());

    // Global event listeners for any input
    document.addEventListener('keydown', (e) => this.handleInput(e));
    document.addEventListener('click', (e) => this.handleInput(e));

    // Gamepad support
    this.setupGamepadSupport();
  }

  private setupGamepadSupport(): void {
    // Listen for gamepad connections
    window.addEventListener('gamepadconnected', (e) => {
      console.log('Gamepad connected:', e.gamepad.id);
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      console.log('Gamepad disconnected:', e.gamepad.id);
    });
  }

  private startGamepadPolling(): void {
    if (this.gamepadPolling) return;
    this.gamepadPolling = true;
    this.pollGamepads();
  }

  private stopGamepadPolling(): void {
    this.gamepadPolling = false;
  }

  private pollGamepads(): void {
    if (!this.gamepadPolling || !this.isMeasuring || !this.colorChangeTime) {
      return;
    }

    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
      if (gamepad) {
        // Check all buttons (0-15 are standard buttons)
        for (let i = 0; i < gamepad.buttons.length; i++) {
          if (gamepad.buttons[i].pressed) {
            this.handleInput(new Event('gamepadbutton'));
            return; // Exit immediately after first button press
          }
        }
      }
    }

    requestAnimationFrame(() => this.pollGamepads());
  }

  private startMeasurement(): void {
    if (this.isMeasuring) return;

    this.isMeasuring = true;
    this.hideResult();
    this.hideStartButton();
    this.updateInstruction(
      'Get ready... The background will change color soon!'
    );

    // Random delay between 1-5 seconds
    const delay =
      Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;

    setTimeout(() => {
      this.changeBackgroundColor();
      this.colorChangeTime = performance.now();
      this.startGamepadPolling();
      this.updateInstruction('NOW! Click or press any key!');
    }, delay);
  }

  private changeBackgroundColor(): void {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#96ceb4',
      '#feca57',
      '#ff9ff3',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }

  private handleInput(_event: Event): void {
    if (!this.isMeasuring || !this.colorChangeTime) return;

    const inputTime = performance.now();
    const lag = inputTime - this.colorChangeTime;

    this.showResult(lag);
    this.resetState();
  }

  private showResult(lagMs: number): void {
    const result: InputLagResult = {
      milliseconds: Math.round(lagMs),
      frames: Number((lagMs / 16.67).toFixed(2)), // Assuming 60 FPS (1000ms / 60fps = 16.67ms per frame)
    };

    const resultElement = document.getElementById('result')!;
    resultElement.innerHTML = `
      <h2>Your Input Lag:</h2>
      <div class="result-display">
        <div class="result-item">
          <span class="value">${result.milliseconds}</span>
          <span class="unit">milliseconds</span>
        </div>
        <div class="result-item">
          <span class="value">${result.frames}</span>
          <span class="unit">frames (60 FPS)</span>
        </div>
      </div>
      <button id="testAgainButton" class="test-again-button">Test Again</button>
    `;

    resultElement.classList.remove('hidden');

    // Setup test again button
    document
      .getElementById('testAgainButton')!
      .addEventListener('click', () => {
        this.startMeasurement();
      });
  }

  private hideResult(): void {
    const resultElement = document.getElementById('result')!;
    resultElement.classList.add('hidden');
  }

  private hideStartButton(): void {
    const startButton = document.getElementById('startButton');
    if (startButton) {
      startButton.style.display = 'none';
    }
  }

  private showStartButton(): void {
    const startButton = document.getElementById('startButton');
    if (startButton) {
      startButton.style.display = 'block';
    }
  }

  private updateInstruction(text: string): void {
    const instructionElement = document.getElementById('instruction')!;
    instructionElement.innerHTML = `<p>${text}</p>`;
  }

  private resetState(): void {
    this.isMeasuring = false;
    this.colorChangeTime = 0;
    this.stopGamepadPolling();
    document.body.style.backgroundColor = '';
    this.showStartButton();
    this.updateInstruction(
      'Click the button below to start measuring your input lag'
    );
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InputLagChecker();
});
