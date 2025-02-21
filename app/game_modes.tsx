import { StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const GAME_MODES = [
  {
    id: 'never_have_I_ever',
    title: 'Never Have I Ever',
    description: 'Classic drinking game of revelations and secrets. Take a sip if you have done it!',
    emoji: '🤫',
    dividerColor: '#FE96FF'  // Purple
  },
  {
    id: 'most_likely_to',
    title: 'Most likely to',
    description: 'Vote on the most likely person to do something! The person with the most votes has to drink',
    emoji: '🤔',
    dividerColor: '#eb7d34'  // Turquoise
  },
  {
    id: 'truth_or_dare',
    title: 'Truth or Dare',
    description: 'Choose your fate: reveal a truth or complete a dare. Skip? Take a shot!',
    emoji: '🎯',
    dividerColor: '#a8c0ff'  // Blue
  },

  // {
  //   id: 'players',
  //   title: 'Party mode',
  //   description: 'Get your party started with a selection of fun and spicy challenges!',
  //   emoji: '🎉',
  //   dividerColor: '#78ffd6'  // Turquoise
  // },
];

export default function HomeScreen() {
  const selectGameMode = (modeId: string) => {
    router.push(modeId as any);
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
                    <View style={[styles.divider, { backgroundColor: mode.dividerColor }]} />
                    <Text style={styles.modeDescription}>
                      {mode.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

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
    marginTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
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
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    height: 2,
    width: '100%',
    marginBottom: 20,
    opacity: 0.8,
  },
  modeDescription: {
    color: 'white',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  
});