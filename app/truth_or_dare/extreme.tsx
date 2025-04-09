import TruthOrDareGame from "@/components/TruthOrDare";

const TRUTHS = [

  ];
  

  const DARES = [

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
