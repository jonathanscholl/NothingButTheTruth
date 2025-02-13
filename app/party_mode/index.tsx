import { useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PlayerManager from '@/components/PlayerManager';

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
    <View style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.difficulty}>Party Mode 🎉 </Text>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          style={styles.scrollView}
        >
          <View style={styles.container}>
            {currentChallenge ? (
              <View style={styles.challengeContainer}>
                <View style={styles.cardContent}>
                  <Text style={styles.neverText}>
                    I have never
                  </Text>
                  <View style={styles.divider} />
                  <Text style={styles.challengeText}>
                    {currentChallenge}
                  </Text>
                  
                  <View style={styles.packInfoContainer}>
                    <Text style={styles.packInfo}>
                      Starter Pack
                      <Text style={styles.packCount}> 1 / 415</Text>
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.challengeContainer}>

                <Text style={styles.startText}>
                  Press Next to begin! 🎮
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.button}
              onPress={newChallenge}
            >
              <Text style={styles.buttonText}>
                Next
              </Text>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#40E0D0',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#40E0D0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 20,
    paddingTop: 20
  },
  backButtonText: {
    fontSize: 40,
    color: '#333',
  },

  difficulty: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    paddingTop: 60
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#40E0D0',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#40E0D0',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeContainer: {
    padding: 30,
    borderRadius: 25,
    width: '100%',
    minHeight: 400,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    width: '100%',
  },
  neverText: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#40E0D0',
    width: '100%',
    marginBottom: 20,
    opacity: 0.3,
  },
  challengeText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 42,
    marginTop: 10,
  },
  startText: {
    color: 'white',
    alignSelf: 'center',
  },
  packInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packInfo: {
    color: '#40E0D0',
    fontSize: 16,
  },
  packCount: {
    color: '#666',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  arrowIcon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  },
});