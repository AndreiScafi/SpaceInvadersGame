/* Code provide by Criss Courses Youtube Channel - https://www.youtube.com/watch?v=MCVU0w73uKI */

/*
01 - Project setup;
02 - Create a player;
03 - Move the player;
04 - Create projectiles;
05 - Create an invader;
06 - Create and move grids of invaders;
07 - Spawn grids at intervals;
08 - Shoot invaders;
09 - Invaders shoot back;
10 - Enemy explosions;
11 - Create background stars;
12 - Lose condition;
13 - Score;
14 - Fixed-width canvas.
*/

// Create a canvas:
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas fills the whole window:
canvas.width = innerWidth;
canvas.height = innerHeight;

