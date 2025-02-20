import LandingPage from '@/components/LandingPage';

const intro_sentences = [
  "Welcome to the Game!",
  "Discover your friends darkest secrets",
  "3 Different Game Modes, Over 1000 free Questions",
];

export default function StarterScreen() {
  return <LandingPage intro_sentences={intro_sentences} title="Starter Pack" />;
} 