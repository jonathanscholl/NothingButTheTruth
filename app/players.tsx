import { StyleSheet, TouchableOpacity, ScrollView, View, Text, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function PlayersScreen() {
  const { gameMode } = useLocalSearchParams<{ gameMode: string }>();
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length >= 2) {
      router.push({
        pathname: `/party_mode`,
        params: { players: JSON.stringify(players) }
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#007991', '#78ffd6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Add Players</Text>
          </View>

          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            style={styles.scrollView}
          >
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={newPlayer}
                  onChangeText={setNewPlayer}
                  placeholder="Enter player name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  onSubmitEditing={addPlayer}
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={addPlayer}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.playerList}>
                {players.map((player, index) => (
                  <View key={index} style={styles.playerItem}>
                    <Text style={styles.playerText}>{player}</Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removePlayer(index)}
                    >
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.startButton,
                  players.length < 2 && styles.buttonDisabled
                ]}
                onPress={startGame}
                disabled={players.length < 2}
              >
                <Text style={styles.startButtonText}>
                  {players.length < 2 
                    ? `Add ${2 - players.length} more player${players.length === 1 ? '' : 's'}`
                    : 'Start Game 🎮'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  headerText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginRight: 52,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    borderRadius: 15,
    padding: 15,
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  playerList: {
    width: '100%',
    gap: 10,
  },
  playerItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playerText: {
    color: '#fff',
    fontSize: 18,
  },
  removeButton: {
    padding: 5,
  },
  removeText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 