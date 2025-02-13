import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useState } from 'react';
import PlayerManager from '@/components/PlayerManager';

export default function HomeScreen() {
  const [players, setPlayers] = useState<string[]>([]);

  const startGame = () => {
    if (players.length >= 2) {
      router.push({
        pathname: "/lobby",
        params: { players: JSON.stringify(players) }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">🍻 Party Time! 🍻</ThemedText>
        
        <PlayerManager players={players} setPlayers={setPlayers} />
        
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.gameButton,
              players.length < 2 && styles.buttonDisabled
            ]}
            onPress={startGame}
            disabled={players.length < 2}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              {players.length < 2 
                ? `Add ${2 - players.length} more player${players.length === 1 ? '' : 's'}`
                : 'Start Game 🎮'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedText type="default" style={styles.disclaimer}>
          Please drink responsibly! 🌟
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
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
  gameButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.8,
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