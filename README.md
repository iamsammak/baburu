## Baburu

### Background

Baburu is a classic cannon shooting game with a puzzle mindset.

Taking the concept of flying objects from asteroids.
In this game the "ship" doesn't fly around instead its a cannon that is fixed to the center of the board and follows the user's mouse-movements.

Initial level of the game will be to shoot down every moving object with your cannon & cannonballs (typical asteroid/shooter game fashion).
Once initial goal is achieved then the real idea and goal of this puzzle shooter game is to shoot your cannonball so that it will touch(bounce off) all four walls without colliding with any of the moving objects.

And the "musical" part comes from the fact that upon collision with a wall, a music note is played. So the goal or storyline that will be developed is that your goal is to have your "four notes" heard.

### Game Play

User interaction Goals:

- [ ] Interact with the game by moving the mouse over the game board
- [ ] Shoot cannonballs out of the cannon by pressing the spacebar or via mouseclick

Bubble Shooter's moving parts:

- [ ] Cannon fixed to the center of canvas that can pivot following the user's mouse location
- [ ] Targets will floating around the board restricted the board area
- [ ] Moving objects will bounce off each other thus changing direction and velocity

Goal of the game:

- [ ] As level's increases the amount of moving objects increases thus increasing the difficulty

Or once moving object logic is coded then triggering different kinds of collision logic can change the game play and level goal
Example:
- [ ] Level 1: aim and shoot - destroy all the moving objects
- [ ] Level 2: aim and shoot - freeze all the objects (objects will unfreeze when another object or your cannonball collides with it)
- [ ] Level 3: touch all four walls - shot your cannonball so that it will touch every wall before colliding with

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Game views

![homepage]
![gameview]
![paused]
![winner]

[homepage]: ./icons/splash.png
[gameview]: ./icons/game_play.png
[paused]: ./icons/paused.png
[winner]: ./icons/winner.png

### Future Implementations

Adding sounds with Howler.js :
- [ ] Ambient bubble mood music
- [ ] Shooting cannonballs
- [ ] Bubble pop
