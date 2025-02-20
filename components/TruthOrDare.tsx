import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TruthOrDareGameProps {
  truths: string[];
  dares: string[];
  title: string;
}

const TRUTH_GRADIENT = ['#FFD700', '#FFA500']; // Golden gradient
const DARE_GRADIENT = ['#9B30FF', '#4B0082']; // Purple gradient
const DEFAULT_GRADIENT = ['#3f2b96', '#a8c0ff']; // Original blue gradient

export default function TruthOrDareGame({ truths, dares, title }: TruthOrDareGameProps) {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [challengeType, setChallengeType] = useState<'truth' | 'dare' | null>(null);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const getGradientColors = () => {
    switch (challengeType) {
      case 'truth':
        return TRUTH_GRADIENT;
      case 'dare':
        return DARE_GRADIENT;
      default:
        return DEFAULT_GRADIENT;
    }
  };

  const animateTransition = () => {
    slideAnim.setValue(width);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const newChallenge = (type: 'truth' | 'dare') => {
    const challenges = type === 'truth' ? truths : dares;
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    if (currentChallenge) {
      animateOut(() => {
        setCurrentChallenge(challenge);
        setChallengeType(type);
        animateTransition();
      });
    } else {
      setCurrentChallenge(challenge);
      setChallengeType(type);
      animateTransition();
    }
  };

  const handleNext = () => {
    animateOut(() => {
      setCurrentChallenge(null);
      setChallengeType(null);
      fadeAnim.setValue(1);
    });
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={getGradientColors() as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            style={styles.scrollView}
          >
            <View style={styles.container}>
              {currentChallenge ? (
                <Animated.View 
                  style={[
                    styles.challengeContainer,
                    challengeType === 'truth' ? styles.truthCard : styles.dareCard,
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    }
                  ]}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.neverText}>
                      {challengeType === 'truth' ? 'Truth 🤔' : 'Dare 😈'}
                    </Text>
                    <View style={[
                      styles.divider,
                      challengeType === 'truth' ? styles.truthDivider : styles.dareDivider
                    ]} />
                    <Text style={styles.challengeText}>
                      {currentChallenge}
                    </Text>
                    
                    <View style={styles.packInfoContainer}>
                      <Text style={[
                        styles.packInfo,
                        challengeType === 'truth' ? styles.truthText : styles.dareText
                      ]}>
                        Starter Pack
                        <Text style={styles.packCount}> {Math.floor(Math.random() * 15) + 1} / 15</Text>
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              ) : (
                <Animated.View 
                  style={[
                    styles.buttonContainer,
                    { opacity: fadeAnim }
                  ]}
                >
                  <TouchableOpacity 
                    style={[styles.button, styles.truthButton]}
                    onPress={() => newChallenge('truth')}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Truth 🤔</Text>
                      <View style={[styles.buttonDivider, styles.truthDivider]} />
                      <Text style={styles.buttonSubtext}>
                        Answer honestly and reveal your secrets...
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.orContainer}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.orLine} />
                  </View>

                  <TouchableOpacity 
                    style={[styles.button, styles.dareButton]}
                    onPress={() => newChallenge('dare')}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Dare 😈</Text>
                      <View style={[styles.buttonDivider, styles.dareDivider]} />
                      <Text style={styles.buttonSubtext}>
                        Accept the challenge if you dare...
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}

              {currentChallenge && (
                <TouchableOpacity 
                  style={styles.nextButton}
                  onPress={() => {
                    setCurrentChallenge(null);
                    setChallengeType(null);
                  }}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                  <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
              )}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 20,
    paddingTop: 90
  },
  backButtonText: {
    fontSize: 40,
    color: '#fff',
  },
  difficulty: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    paddingTop: 60
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
  },
  challengeContainer: {
    padding: 30,
    borderRadius: 25,
    width: '100%',
    minHeight: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  truthCard: {
    backgroundColor: '#2C2C2C', // Slightly lighter than default
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)', // Subtle golden border
  },
  dareCard: {
    backgroundColor: '#2C2C2C', // Slightly lighter than default
    borderWidth: 1,
    borderColor: 'rgba(155, 48, 255, 0.3)', // Subtle purple border
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
    backgroundColor: '#a8c0ff',
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
  buttonContainer: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: 250,
    borderRadius: 25,
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
  buttonContent: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 25,
  },
  buttonEmoji: {
    fontSize: 40,
    color: 'white',
    marginBottom: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 8,
  },

  buttonSubtext: {
    color: '#fff',
    fontSize: 24,
    opacity: 0.7,
    lineHeight: 24,
  },
  buttonDivider: {
    height: 2,
    width: '100%',
    marginVertical: 12,
  },
  truthDivider: {
    backgroundColor: '#FFD700', // Golden yellow
    opacity: 0.8,
  },
  dareDivider: {
    backgroundColor: '#9B30FF', // Purple
    opacity: 0.8,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 10,
    width: '85%',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  orText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
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
    color: '#a8c0ff',
    fontSize: 16,
  },
  packCount: {
    color: '#666',
  },
  truthText: {
    color: '#FFD700', // Golden yellow
  },
  dareText: {
    color: '#9B30FF', // Purple
  },
  nextButton: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 60,
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
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  arrowIcon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  },
  truthButton: {
    backgroundColor: '#333',
  },
  dareButton: {
    backgroundColor: '#333',
  },
}); 