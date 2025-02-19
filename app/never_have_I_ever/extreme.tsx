import NeverHaveIEverGame from '@/components/NeverHaveIEverGame';

const CHALLENGES = [
  "Never have I ever sent a text to the wrong person 📱",
  "Never have I ever fallen asleep in class 😴",
  "Never have I ever pretended to be sick to skip work/school 🤒",
  "Never have I ever eaten food that fell on the floor 😋",
  "Never have I ever stalked someone on social media 👀",
  "Never have I ever lied about my age 🎂",
  "Never have I ever forgotten someone's name while talking to them 😅",
  "Never have I ever sang karaoke in public 🎤",
  "Never have I ever accidentally liked an old post while stalking 🙈",
  "Never have I ever pulled an all-nighter 🌙"
];

export default function ExtremeScreen() {
  return <NeverHaveIEverGame challenges={CHALLENGES} title="Extreme Mode" />;
} 