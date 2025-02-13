import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PlayerManagerProps {
  players: string[];
  setPlayers: (players: string[]) => void;
}

export default function PlayerManager({ players, setPlayers }: PlayerManagerProps) {
  const [newPlayer, setNewPlayer] = useState('');
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const addPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Players</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { 
            backgroundColor,
            color: textColor,
            borderColor: tintColor
          }]}
          value={newPlayer}
          onChangeText={setNewPlayer}
          placeholder="Enter player name"
          placeholderTextColor={textColor + '80'} // 50% opacity
          onSubmitEditing={addPlayer}
        />
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: tintColor }]} 
          onPress={addPlayer}
        >
          <ThemedText type="defaultSemiBold" lightColor="#f0f0f0" darkColor="#2A2A2A">+</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.playerList}>
        {players.map((player, index) => (
          <ThemedView 
            key={index} 
            style={[styles.playerItem]}
            lightColor="#f0f0f0"
            darkColor="#2A2A2A"
          >
            <ThemedText type="default">{player}</ThemedText>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removePlayer(index)}
            >
              <ThemedText 
                type="defaultSemiBold" 
                style={[styles.removeText, { color: '#FF6B6B' }]}
              >
                ✕
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },

  playerList: {
    gap: 10,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  removeButton: {
    padding: 5,
  },
  removeText: {
    fontSize: 16,
  },
}); 