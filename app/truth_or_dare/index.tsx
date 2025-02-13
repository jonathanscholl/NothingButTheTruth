import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const GAME_MODES = [
  {
    id: 'starter',
    title: 'Starter Pack',
    description: 'Perfect for warming up! Basic drinking games and challenges.',
    count: '415 cards',
    emoji: '🎮'
  },
  {
    id: 'spicy',
    title: 'Spicy Edition',
    description: 'Things are heating up! More daring challenges and revelations.',
    count: '300 cards',
    emoji: '🌶️'
  },
  {
    id: 'extreme',
    title: 'Extreme Mode',
    description: 'Not for the faint of heart! The wildest challenges await.',
    count: '250 cards',
    emoji: '🔥'
  }
];

export default function HomeScreen() {
  const selectGameMode = (modeId: string) => {
    router.push({
      pathname: "/lobby",
      params: { mode: modeId }
    });
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#8A2BE2', '#C71585', '#FF1493']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Game Modes</Text>
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            style={styles.scrollView}
          >
            <View style={styles.container}>
              {GAME_MODES.map((mode) => (
                <TouchableOpacity 
                  key={mode.id}
                  style={styles.modeContainer}
                  onPress={() => selectGameMode(mode.id)}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.modeTitle}>
                      {mode.title} {mode.emoji}
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.modeDescription}>
                      {mode.description}
                    </Text>
                    <Text style={styles.cardInfo}>
                      {mode.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={styles.disclaimer}>
                Please drink responsibly! 🌟
              </Text>
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

    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
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
    justifyContent: 'center',
    gap: 20,
  },
  modeContainer: {
    padding: 30,
    borderRadius: 25,
    width: '100%',
    minHeight: 200,
    backgroundColor: 'rgba(51, 51, 51, 0.95)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContent: {
    flex: 1,
    width: '100%',
  },
  modeTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    height: 2,
    backgroundColor: '#FF69B4',
    width: '100%',
    marginBottom: 20,
    opacity: 0.3,
  },
  modeDescription: {
    color: 'white',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  cardInfo: {
    color: '#FF69B4',
    fontSize: 16,
    marginTop: 'auto',
    opacity: 0.8,
  },
  disclaimer: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
});