import LandingPage from '@/components/LandingPage';

const intro_sentences = [

  {
    sentence: "Welcome to the Game!",
    title: "Welcome",
    icon: "beer-outline"
  },
  {
    sentence: "Discover your friends darkest secrets",
    title: "Discover",
    icon: "eye-outline"
  },
  {
    sentence: "3 Different Game Modes, Over 1000 free Questions",
    title: "Variety",
    icon: "game-controller-outline"
  }
];

export default function StarterScreen() {
  return <LandingPage intro_sentences={intro_sentences.map(sentence => sentence.sentence)} icon={intro_sentences.map(icon => icon.icon)} title={intro_sentences.map(title => title.title)} />;
} 