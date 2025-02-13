import { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';

const CHALLENGE_TEMPLATES = [
  "{player} drinks! 🍻",
  "{player} gives out 5 sips 🎯",
  "{player} and {player2} must stare into each other's eyes. First to laugh drinks! 👀",
  "Everyone drinks except {player} 🥂",
  "{player} must share their most embarrassing dating story or drink twice! 😳",
  "{player} must do their best seductive dance move or drink! 💃",
  "Everyone votes who's most likely to {action}. That person drinks! 🗳️",
  "{player} must call their most recent ex or take 3 shots! 📱",
  "{player} must reveal their biggest secret or finish their drink! 🤫", 
  "{player} and {player2} must swap phones for 2 minutes or both drink! 📱",
  "{player} must do their best pickup line on {player2} or drink! 😘",
  "Truth or Drink: {player} must answer a spicy question from the group! 🌶️",
  "{player} must give {player2} a sensual massage for 30 seconds or take 2 shots! 💆‍♂️",
  "{player} must sit on {player2}'s lap until their next turn or both drink! 🪑",
  "7 Minutes in Heaven: {player} and {player2} must go in a closet or both finish their drinks! 👀",
  "{player} must remove one article of clothing or take 2 shots! 👕",
  "{player} must let {player2} post anything on their social media or drink! 📱",
  "Body Shot Time! {player} must take a shot off of {player2} or both drink double! 🥃",
  "{player} must show their most scandalous photo or finish their drink! 📸",
  "{player} must recreate their best O-face or drink! 😩",
  "{player} must demonstrate their best kissing technique on a fruit or drink! 🍑",
  "Dirty Never Have I Ever: {player} starts! Losers drink! 🤫",
  "{player} must give {player2} a lap dance or both drink! 💃",
  "{player} must reveal their body count or finish two drinks! 🔢",
  "{player} must describe their wildest fantasy or drink! 💭"
];

const ACTIONS = [
  "have a secret crush on someone in this room",
  "get caught skinny dipping",
  "have a scandalous story they haven't told anyone",
  "slide into a celebrity's DMs",
  "have an OnlyFans account",
  "get married in Vegas",
  "date two people at once",
  "have a wild one night stand story",
  "send a risky text to the wrong person",
  "get kicked out of a club",
  "hook up with their best friend's ex",
  "post something they seriously regret on social media"
];

export default function GameScreen() {
  const { players: playersParam } = useLocalSearchParams<{ players: string }>();
  const [players] = useState<string[]>(JSON.parse(playersParam || '[]'));
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [previousChallenges, setPreviousChallenges] = useState<string[]>([]);

  const getRandomPlayer = (exclude?: string) => {
    const availablePlayers = exclude ? players.filter(p => p !== exclude) : players;
    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
  };

  const getRandomAction = () => {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  };

  const formatChallenge = (template: string) => {
    let challenge = template;
    
    if (challenge.includes("{player2}")) {
      const player1 = getRandomPlayer();
      const player2 = getRandomPlayer(player1);
      challenge = challenge
        .replace("{player}", player1)
        .replace("{player2}", player2);
    } else if (challenge.includes("{player}")) {
      challenge = challenge.replace("{player}", getRandomPlayer());
    }
    
    if (challenge.includes("{action}")) {
      challenge = challenge.replace("{action}", getRandomAction());
    }
    
    return challenge;
  };

  const newChallenge = () => {
    if (players.length === 0) {
      setCurrentChallenge("Add some players to start the game! 👥");
      return;
    }

    const template = CHALLENGE_TEMPLATES[
      Math.floor(Math.random() * CHALLENGE_TEMPLATES.length)
    ];
    
    const challenge = formatChallenge(template);
    setCurrentChallenge(challenge);
    setPreviousChallenges(prev => [...prev, challenge]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">🍻 Drinking Game 🍻</ThemedText>
          
          {currentChallenge ? (
            <ThemedView 
              style={styles.challengeContainer}
              lightColor="#f0f0f0"
              darkColor="#2A2A2A"
            >
              <ThemedText type="subtitle">
                {currentChallenge}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView 
              style={styles.challengeContainer}
              lightColor="#f0f0f0"
              darkColor="#2A2A2A"
            >
              <ThemedText type="default">
                Press Start to begin! 🎮
              </ThemedText>
            </ThemedView>
          )}

          <TouchableOpacity 
            style={styles.button}
            onPress={newChallenge}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              {currentChallenge ? 'Next Challenge!' : 'Start Game!'}
            </ThemedText>
          </TouchableOpacity>

          <ThemedText type="default" style={styles.disclaimer}>
            Please drink responsibly! 🌟
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  challengeContainer: {
    padding: 25,
    borderRadius: 15,
    width: '100%',
    marginVertical: 20,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
  },
  disclaimer: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
  },
});