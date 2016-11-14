## Bubble Shooters (rename to be decided)

### Background

**NB**: You'll probably want to keep the Background section for your production Readme as well.  

Bubble Shooters is a classic cannon shooting game with a puzzle mindset.

Taking the concept of flying objects from asteroids.
In this game the "ship" doesn't fly around instead its a cannon that is fixed to the center of the board and follows the user's mouse-movements.

Initial level of the game will be to shoot down every moving object with your cannon & cannonballs (typical asteroid/shooter game fashion).
Once initial goal is achieved then the real idea and goal of this puzzle shooter game is to shoot your cannonball so that it will touch(bounce off) all four walls without colliding with any of the moving objects.

And the "musical" part comes from the fact that upon collision with a wall, a music note is played. So the goal or storyline that will be developed is that your goal is to have your "four notes" heard.

### Functionality & MVP  

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

### Wireframes

This app will consist of two screens: start page and game view. The start page will have a two buttons: "play" and "how to play" which will start the game and the second button will trigger a modal to pop up with game play hints and tips.

![homepage]
![gameview]

[homepage]: ./wireframes/home_page.png
[gameview]: ./wireframes/game_view.png


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- `Sound.js` for in game sound effects
- Webpack to bundle

In addition to the webpack entry file, there will be three scripts involved in this project:

* `game.js`
    * this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.
    * trigger the collision logic for each level
    * Holds the collection of bubbles per level
* `moving_object.js`
    * Base class for cannonballs and bubbles
    * Contains collision logic
* `bubble.js`
    * pop the bubbles
* `cannonball.js`
    * with cannonballs
*  `cannon.js`
    * bind event handler to .mousemove()
    * onClick will fire a cannonball
* `game_view.js`
    * Stores the `Game` instance
    * `canvas` context to draw the game
    * Count down timer for the score

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create `webpack.config.js`, `package.json` and `index.html`. Learn the basics of `Easel.js` and rendering canvas elements.  
Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object-cannon to the center of canvas and get moving bubbles.

**Day 2**: This day is dedicated to pushing out the core collision logic. This includes restricting all elements to stay within the board boundaries and to keep/exchange velocity upon collision.
Goals for the day:

- Research velocity of two objects after collision
- Layout for the home page and game view setup (doesn't have to be styled nicely yet)
- Test mousemove listener and cannon's mobility
- Test and debug collision logic

**Day 3**: Continue implementing collision logic and assure that the bubble and cannonballs move at correct speeds
Goals for the day:

- Implement count down timer (aka user's level score)
- Add `wall.js` that handles the logic of a cannonball colliding with the wall. Wall will be highlighted if touched
- Level won't be complete until all four walls are highlighted together
- Handle the game interations


**Day 4**: Styling styling styling, making it polished and professional.  
Goals for the day:

- Levels can also be independent of each other, so maybe make buttons to trigger that game type (destroy, freeze, walls)
- Flush out the instructions, game tips and production ReadMe
