const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];

// 1

const usernamesWithExclamation = [];

// Use forEach to add usernames with "!" to the array
gameInfo.forEach(player => {
  usernamesWithExclamation.push(player.username + "!");
});

console.log(usernamesWithExclamation);
// 2

const highScorers = [];

// Use forEach to add usernames of players with score > 5
gameInfo.forEach(player => {
  if (player.score > 5) {
    highScorers.push(player.username);
  }
});

console.log(highScorers);

// 3

let totalScore = 0;
gameInfo.forEach(player => {
  totalScore += player.score;
});
console.log(totalScore); // 71