/**
 *
 * Author : Maz
 *
 * Source : Mozilla
 *
 * If your connection is slow
 * please wait the sprite load
 *
*/

// ~~~~~~~~~~~ What's New? ~~~~~~~~~~~

// Added buttons to modify default settings

// Added Clear button, 
// thanks to Haras Zaharakis 
// for his feedback!

// Added further buttons
// thanks to Amrit Mahendra Joseph
// for his feedback!

// Added the green theme, don't ask me why.

// Fixed issue with the buttons
// Thanks to Fonysony 
// for his feedback!

// Added text to show current settings
// thanks to Fonysony
// for his feedback!

// Fixed tons of conflicts between buttons

// Added real time gravity effect 
// provided by: burey

onload = function() {
    console.log = function(){}; // empty console

    var grav = document.getElementsByTagName('button')[1];
    var vel = document.getElementsByTagName('button')[3];
    var bounce = document.getElementsByTagName('button')[5];

    var Dgrav = document.getElementsByTagName('button')[0];
    var Dvel = document.getElementsByTagName('button')[2];
    var Dbounce = document.getElementsByTagName('button')[4];

    var clear = document.getElementsByTagName('button')[6];

    var val_vel = 800;
    var val_grav = 3000;
    var val_bounce = 0.3+Math.random()*0.5;

    var txt;

    var game = new Phaser.Game(340, 300, Phaser.AUTO, null, { preload: preload, create: create, update: update });
    // create canvas
     
    var balls; // initialize balls variable

    function preload(){
        remote(); // for remote sources
        
        game.scale.pageAlignHorizontally = true;
        // align horizontally

        game.stage.backgroundColor = "#222";

    // change background color
        
        game.load.image('ball', 'img/ball.png');
        // preload image
    }

    function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE); // enable physics

        balls = game.add.group();
        balls.enableBody = true;
        // create group and enable collisions
        
        
        game.input.onDown.add(function(){
            // ontouchstart event
            
            ball = balls.create(0,0,'ball');
            // create a ball in the balls group
            
            game.physics.enable(ball, Phaser.Physics.ARCADE);
            // enable physics for the ball
        
            ball.body.collideWorldBounds = true;
            // collision with the canvas edges
            
            ball.body.velocity.set(val_vel);
            // set ball velocity
            ball.body.bounce.set(val_bounce);
            // set random bounce for the ball
            
            ball.body.gravity.y = val_grav;  
            // set gravity on y axis       
        }, this)   
        
        txt = game.add.text(5,5,'g: ' + val_grav + '   v: ' + val_vel + '   b: ' + val_bounce, {font: '15px arial', fill:'#555'});
          
    }

    function update_txt() {
        txt.setText('g: ' + val_grav + ' v: ' + val_vel + ' b: ' + val_bounce);
    }

    function updateGravity(){
        if(!balls.length){return;}
        balls.forEach(function(ball){
            ball.body.gravity.y=val_grav;
        });
    }

    // buttons to modify settings
    grav.ontouchstart=function(){
        val_grav += 500; update_txt();  
        updateGravity()
    }
    vel.ontouchstart=function(){
        val_vel += 100; update_txt();
    }
    bounce.ontouchstart=function(){
        val_bounce = 0.8+Math.random()*0.3;
        update_txt();
    }

    Dgrav.ontouchstart=function(){
        val_grav-= 500; update_txt();
        updateGravity()
    }
    Dvel.ontouchstart=function(){
        val_vel -= 100; update_txt();
    }
    Dbounce.ontouchstart=function(){
        val_bounce = 0.1+Math.random()*0.5;
        update_txt();
    }



    // clear
    clear.ontouchstart=function(){

        val_vel = 800;
        val_grav = 3000;
        val_bounce = 0.3+Math.random()*0.5;

        // thanks to mr.StackOverflow
        balls.forEach(function (c) {c.kill();});
        
        update_txt();
    }

    function update(){
        game.physics.arcade.collide(balls);
        // active collision between circles
    }

    // This function is used to load
    // remote sources... if you have
    // cross origin issues try to restart
    function remote() {
        game.load.baseURL = 'https://end3r.github.io/Gamedev-Phaser-Content-Kit/demos/';
        game.load.crossOrigin = 'anonymous';
    }
}
