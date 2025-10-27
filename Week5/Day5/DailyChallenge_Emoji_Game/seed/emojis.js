

const emojis =[
{ emj: "😉", name: "wink" },
  { emj: "😂", name: "joy" },
  { emj: "🤣", name: "rofl" },
  { emj: "❤️", name: "heart" },
  { emj: "🔥", name: "fire" },
  { emj: "👍", name: "thumbs up" },
  { emj: "👎", name: "thumbs down" },
  { emj: "👀", name: "eyes" },
  { emj: "🎉", name: "party" },
  { emj: "💀", name: "skull" },
  { emj: "👑", name: "crown" },
  { emj: "💯", name: "hundred" },
  { emj: "🤔", name: "thinking" },
  { emj: "🙏", name: "pray" },
  { emj: "✨", name: "sparkles" },
  { emj: "🥺", name: "pleading" },
  { emj: "😭", name: "sob" },
  { emj: "✅", name: "check mark" },
  { emj: "🤷", name: "shrug" },
  { emj: "🌮", name: "taco" },
  { emj: "🦄", name: "unicorn" },
  { emj: "🍕", name: "pizza" },
  { emj: "🚀", name: "rocket" },
  { emj: "💡", name: "light bulb" },
  { emj: "⭐", name: "star" },
  { emj: "🌈", name: "rainbow" },
  { emj: "🎸", name: "guitar" },
  { emj: "🏆", name: "trophy" },
  { emj: "📚", name: "books" },
  { emj: "🎮", name: "video game" },
  { emj: "🍦", name: "ice cream" },
  { emj: "🐱", name: "cat" },
  { emj: "🐶", name: "dog" }
]

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    console.log(emojis[randomIndex]);
    //console.log(emoji[randomIndex].emj);
    //console.log(emoji[randomIndex].name);

    return emojis[randomIndex]

}
//getRandomEmoji()

export default getRandomEmoji
