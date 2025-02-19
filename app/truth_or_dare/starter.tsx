import TruthOrDareGame from "@/components/TruthOrDare";

const TRUTHS = [
  "What's the most embarrassing song on your playlist? 🎵",
  "What's the longest you've gone without showering? 🚿",
  "What's your biggest irrational fear? 😱",
  "What's the most childish thing you still do? 👶",
  "What's your worst habit? 😬",
  "What's the last lie you told? 🤥",
  "What's your most awkward first date story? 💑",
  "What's the most embarrassing thing your parents have caught you doing? 😳",
  "What's your biggest regret from high school? 🏫",
  "What's the meanest thing you've ever said to someone? 😔",
  "What's one thing you'd change about your appearance? 👀",
  "What's the most embarrassing thing in your search history? 🔍",
  "What's your biggest insecurity? 💭",
  "What's the most trouble you've ever been in? ⚠️",
  "What's your worst fashion mistake? 👕"
];

const DARES = [
  "Text your crush and tell them you like them 💌",
  "Do your best dance move right now 💃",
  "Let someone post anything they want on your social media 📱",
  "Call your mom and tell her you're getting married 💍",
  "Speak in an accent for the next 3 rounds 🗣️",
  "Show everyone your camera roll 📸",
  "Let someone go through your text messages 💬",
  "Do 20 push-ups right now 💪",
  "Eat a spoonful of hot sauce 🌶️",
  "Call the 5th person in your contacts and sing them a song 🎤",
  "Post your most embarrassing photo on Instagram 📷",
  "Let someone style your hair however they want 💇‍♂️",
  "Send your last selfie to a random contact 🤳",
  "Do your best impression of another player 🎭",
  "Wear your clothes backwards for the next 3 rounds 👕"
];

export default function StarterScreen() {
  return (
    <TruthOrDareGame
      truths={TRUTHS}
      dares={DARES}
      title="Starter Pack 🎮"
    />
  );
}