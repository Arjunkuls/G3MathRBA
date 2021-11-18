let problems = [
    {title:"Find the odd number from", body:"a) 36119 \n b)57624 \n c)72927 \n d)47632 \n e)67626", answer:67},
    {title:"225 : 23 : : 529 : ?", body:"a) 23 \n b) 27 \n c) 33 \n d) 17", answer:65},
    {title:"A car of mass 50kg moves at a speed of 40km/hr, find it's kinetic energy in Joules(J)", body:"a)2000J \n b)1500J \n c)2500J \n d)1000J", answer:68},
    {title:"Vedant gave a long speech in the French class on how bad he was with technology.", overflow:"To improve this, he has decided to play tennis for 1/2 of his working day, \nstudy for 1/4 of his working day and learn technology for the remaining time. \nFor how long does Vedant learn technology assuming that he sleeps for 8 hours", body:"a)3 hours\nb)6 hours \nc)2 hours \nd)4 hours", answer:68, isVed:true},
    {title:"The three sides of a right angled triangle are 3 (height),", overflow:" 4 (base) and 8 (hypotenuse). Find the are of the triangle.", body:"a)6 square units \nb)8 square units \nc)4 square units \nd)The triangle is not valid", answer:68},
    {title:"Six wolves catch six lambs in six minutes.", overflow:" How many wolves will be needed to catch sixty lambs in sixty minutes?", body:"a)10 wolves \nb)60 wolves \nc)30 wolves \nd)6 wolves", answer:68},
    {title:"Can you divide a square into 5 1/5ths?", body:"a)Yes its easy \nb)Yes but its really hard \nc)Impossible \nd)This question is invalid", answer:66},
  ]
let inp, prob;
var end = false;
var score = 0;

function getMathProblem(){
  if(end===false){
  background(255)
    if (prob === undefined){
  prob = choose(problems);
console.log(prob)}
prob.overflow !== undefined? textSize(20): textSize(32)
  fill(0)
  // prob.isVed === true ? text(prob.title, width/2-textWidth(prob.title)/2, height/2-100) : text(prob.title, width/2-textWidth(problems[2].title)/2, height/2-50)
  text(prob.title, width/2-textWidth(prob.title)/2, (height/2-100))
  prob.overflow !== undefined? text(prob.overflow, width/2-textWidth(prob.title)/2, height/2-78) : console.log("no overflow")

    textSize(28)
  fill(0)
  text(prob.body, width/2-textWidth(prob.body)/2, (height/2))
  }
}
function keyPressed(){
  try{
    console.log(keyCode)
  if (game.over === true){
    if (keyCode === prob.answer){
      console.log("yay!")
      fill(170, 255, 0)
      prob = undefined;
      score++;
      alert("Good Job!")
      game.reset()
    }else{
      end = true
      alert("Sorry you lose!")
      fill(255,10,10)
      score = 0;
      end = false
      prob = undefined
      game.reset()
    }
  }}
  catch(error){
    console.log("Something Went Wrong! The error was: " + error)}
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}


let ball = {
  x: 300,
  y: 150,
  radius: 10,
  speed: {
    x: 10,
    y: 0
  },
  draw: function() {
    circle(this.x, this.y, this.radius * 2);
  },
  reset: function() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed.x = 10;
    this.speed.y = 0;
    this.play = true;
  }
};

let player1 = {
  x: 10,
  y: 150,
  radius: 30,
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line(this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

let player2 = {
  x: 880,
  y: 150,
  radius: 30,
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line(this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

function setup() {
  createCanvas(1200, 600);
  stroke(255);
  fill(255);

  game.reset();
}

let game = {
  over: false,
  reset: function() {
    this.over = false;
    ball.reset();
    player1.reset();
    player2.reset();
  },
  tick: function() {
    if( this.over === false ){
      // y: keep ball inside of vertical bounds
      if (ball.y < 10 || ball.y > height - 10) {
        ball.speed.y *= -1;
      }
      ball.y += ball.speed.y;

      // x: player 2
      if (ball.x + ball.radius >= player2.x) {
        ball.speed.x *= -1;
      }

      // x: player 1
      if (ball.x - ball.radius <= player1.x) {
        if (ball.y > player1.y - player1.radius &&
            ball.y < player1.y + player1.radius) {
          // player 1 hits the ball

          // bounce back
          ball.speed.x *= -1;
          // get ball-paddle angle
          let angle = ball.y - player1.y;
          ball.speed.y = angle / 9;
          ball.speed.x = map(abs(angle), 0, player1.radius, 10, 9);

        } else {
          // player misses the ball
          this.over = true;
        }
      }
    }
    // if (ball.x < -500) {
    //   game.reset();
    // }    
    ball.x += ball.speed.x;

    ball.draw();
  }

};

function draw() {

  if(game.over === false){
    background(0);
  } else {
    background(255,0,0);
    rect(0, 0, 600, 300);
    getMathProblem();
  }

  if (end === false){
  text(score, width/2-textWidth(score)/2, 20)

  player1.position(mouseY);
  player1.draw();

  player2.position(ball.y);
  player2.draw();

  game.tick();
  }
}