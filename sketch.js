let bg = ["#F2EDEC"];
var dogs = [];

class dog_class {
  constructor(args) {
    this.q = args.q || { x: random(width), y: random(height) };
    this.w = args.w || random(150, 300);
    this.h = args.h || random(300, 400);
    this.d = args.d || random(150, 300);
    this.color = args.color || random(["#E26761", "#6693A0", "#EBC06F", "#A7A6A4", "#605951"]);
    this.isMovingRandomly = args.isMovingRandomly || false; // 是否隨機移動
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
  }

  draw() {
    push();
    translate(this.q.x + this.w / 2, this.q.y + this.h / 2);

    //  ミミ
    strokeWeight(this.d / 3.4);
    stroke(this.color);
    noFill();
    arc(0, this.d / 4, this.d, this.d, random(150, 210), random(330, 390));

    //  カオ
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.d, this.d / 1.12);

    //  メ
    fill("#000000");
    circle(-this.d / 6, -this.d / 50, this.d / 7.5);
    circle(this.d / 6, -this.d / 50, this.d / 7.5);

    //  クチ
    fill(bg);
    ellipse(0, this.d / 7.5, this.d / 2.2, this.d / 3);

    //  ハナ
    fill(this.color);
    ellipse(0, this.d / 11, this.d / 5, this.d / 7);

    pop();
  }

  update() {
    if (this.isMovingRandomly) {
        // 隨機移動
        this.q.x += this.vx;
        this.q.y += this.vy;
        
        // 檢查是否碰到視窗邊界
        if (this.q.x < 0) {
            this.q.x = 0;
            this.vx *= -1; // 反轉水平速度
        } else if (this.q.x > width) {
            this.q.x = width;
            this.vx *= -1; // 反轉水平速度
        }

        if (this.q.y < 0) {
            this.q.y = 0;
            this.vy *= -1; // 反轉垂直速度
        } else if (this.q.y > height) {
            this.q.y = height;
            this.vy *= -1; // 反轉垂直速度
        }
    } else {
        // 根據顏色決定移動方式
        if (this.color === "#E26761" || this.color === "#EBC06F") {
            // 紅色和黃色的狗上下跳動
            let jump = random(-10, 10); // 增加範圍，讓幅度更大
            this.q.y += jump;
            // 檢查是否碰到視窗上下邊界
            if (this.q.y < 0 || this.q.y > height) {
                jump *= -1; // 反轉跳動方向
                this.q.y = constrain(this.q.y, 0, height);
            }
        } else {
            // 藍色和灰色的狗隨機移動
            this.q.x += random(-3, 3);
            this.q.y += random(-3, 3);
            
            // 檢查是否碰到視窗邊界
            if (this.q.x < 0) {
                this.q.x = 0;
                this.vx *= -1;
            } else if (this.q.x > width) {
                this.q.x = width;
                this.vx *= -1;
            }

            if (this.q.y < 0) {
                this.q.y = 0;
                this.vy *= -1;
            } else if (this.q.y > height) {
                this.q.y = height;
                this.vy *= -1;
            }
        }
    }
}
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background("#F2EDEC");
  for (let i = 0; i < 50; i++) {
    let isMovingRandomly = random() < 0.5; // 50% 的機率隨機移動
    let color;
    if (random() < 0.5) {
      // 50% 的機率選擇紅色或黃色
      color = random(["#E26761", "#EBC06F"]);
    } else {
      // 50% 的機率選擇藍色或灰色
      color = random(["#6693A0", "#A7A6A4"]);
    }
    let dog = new dog_class({ color: color, isMovingRandomly: isMovingRandomly });
    dogs.push(dog);
  }
}

function draw() {
  background(bg);
  for (let j = 0; j < dogs.length; j++) {
    let dog = dogs[j];
    dog.draw();
    dog.update();
  }
}