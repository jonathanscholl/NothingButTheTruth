import { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CHALLENGES = [
  "sent a text to the wrong person 📱",
  "fallen asleep in class 😴", 
  "pretended to be sick to skip work/school 🤒",
  "eaten food that fell on the floor 😋",
  "stalked someone on social media 👀",
  "lied about my age 🎂",
  "forgotten someone's name while talking to them 😅",
  "sang karaoke in public 🎤",
  "accidentally liked an old post while stalking 🙈",
  "pulled an all-nighter 🌙",
  "forgotten my password right after changing it 🔑",
  "walked into a glass door 🚪",
  "sent a message to the wrong group chat 💬",
  "worn clothes inside out in public 👕",
  "tried to unlock the wrong car 🚗",
  "gotten stuck in an elevator ⬆️",
  "pretended to know a song's lyrics 🎵",
  "waved at someone who wasn't waving at me 👋",
  "taken a selfie in public and felt awkward 📸",
  "accidentally called someone while my phone was in my pocket 📞",
  "eaten an entire pizza by myself 🍕",
  "binged an entire TV series in one day 📺",
  "forgotten where I parked my car 🅿️",
  "tried to push a pull door 🚪",
  "lost my phone while it was in my hand 📱",
  "talked to myself in public 🗣️",
  "tripped over nothing 🦶",
  "gotten brain freeze from eating too fast 🧊",
  "laughed at a joke I didn't understand 😂",
  "pretended to be on the phone to avoid someone 📱",
  "gone to work/school with different shoes on 👞",
  "fallen asleep during a movie at the cinema 🎬",
  "accidentally liked a really old Instagram post 📱",
  "gotten lost following GPS directions 🗺️",
  "danced in an elevator when I thought I was alone 💃",
  "replied all to an email by mistake 📧",
  "walked into a room and forgotten why I went there 🚶",
  "taken a picture of my food for social media 📸",
  "used the wrong emoji in a serious conversation 😬",
  "gotten competitive over a board game 🎲",
  "pretended to understand what someone said 👂",
  "spent an entire day in pajamas 🛋️",
  "forgotten my own birthday for a moment 🎂",
  "tried to scroll on a paper book 📚",
  "said 'you too' when a waiter said 'enjoy your meal' 🍽️",
  "posted something online and immediately deleted it 🙈",
  "forgotten my phone was on speaker in public 📢",
  "tried to drink from an empty cup ☕",
  "walked around with something stuck in my teeth 😬",
  "gotten into the wrong car thinking it was my ride 🚗",
  "accidentally opened my front camera in public 📸",
  "forgotten to unmute myself in a video call 🎤",
  "put an empty container back in the fridge 🌭",
  "used a filter during a work video call 👾",
  "double-dipped a chip when no one was looking 🌯",
  "pretended to know about a movie I've never seen 🎬",
  "gotten locked out of my house 🏠",
  "sent a screenshot to the person I was screenshotting 😱",
  "tried to unlock my house with my car keys 🔑",
  "forgotten someone's name during introductions 🤝",
  "watched the same show twice without realizing 📺",
  "worn clothes inside out all day 👕",
  "accidentally liked an ex's post 💔",
  "fallen asleep during a video call 😴",
  "pretended to laugh at a joke I didn't hear 😂",
  "taken a bite of something too hot 🔥",
  "walked into a pole while looking at my phone 📱",
  "forgotten my age for a moment 🎂",
  "used the wrong name for my teacher/boss 😅",
  "accidentally called someone 'mom' or 'dad' 👪",
  "gotten stuck in a sweater while trying it on 👕",
  "dropped my phone on my face while lying down 📱",
  "said 'bye' and walked in the same direction 👋",
  "tried to drink from a closed water bottle 💧",
  "lost rock paper scissors more than 5 times in a row ✌️",
  "forgotten my PIN at the ATM 💳",
  "sent a voice message and immediately regretted it 🎤",
  "tried to use an expired coupon 🏷️",
  "gotten into an argument with a GPS 🗺️",
  "forgotten what day of the week it was 📅",
  "used shampoo twice and skipped conditioner 🧴",
  "eaten dessert before dinner 🍰",
  "pretended to know about sports 🏈",
  "bought something just for the free shipping 📦",
  "forgotten my umbrella on a rainy day ☔",
  "tried to charge a dead device with a turned-off power strip 🔌",
  "gotten caught singing in the car by other drivers 🎵",
  "used the wrong emoji to react to sad news 😬",
  "forgotten to save a document and lost everything 💾",
  "tried to open my house with my office keycard 🔑",
  "put something in a 'safe place' and lost it 🤔",
  "gotten caught taking a selfie 📸",
  "spelled my own name wrong ✍️",
  "forgotten what I was saying mid-sentence 💭",
  "tried to tap a photo in a physical magazine 📱",
  "gotten caught in a reply-all email chain 📧",
  "forgotten to add water to my instant noodles 🍜",
  "worn mismatched socks all day 🧦",
  "tried to turn up the volume on a picture 🔊",
  "accidentally started a video call 📹",
];

export default function StarterScreen() {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [previousChallenges, setPreviousChallenges] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableChallenges, setAvailableChallenges] = useState<string[]>([...CHALLENGES]);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Add useEffect to load first challenge
  useEffect(() => {
    newChallenge();
  }, []);

  const animateCard = () => {
    // Reset position
    slideAnim.setValue(width);
    fadeAnim.setValue(0);

    // Animate slide in from right
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

  const newChallenge = () => {
    if (availableChallenges.length === 0) {
      // All challenges have been used, reset the available challenges
      setAvailableChallenges([...CHALLENGES]);
      setCurrentIndex(0);
      setPreviousChallenges([]);
      return;
    }

    // Get a random challenge from the available ones
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    const challenge = availableChallenges[randomIndex];
    
    // Remove the selected challenge from available challenges
    const updatedChallenges = availableChallenges.filter((_, index) => index !== randomIndex);
    setAvailableChallenges(updatedChallenges);
    
    // Update the current challenge and related states
    setCurrentChallenge(challenge);
    setPreviousChallenges(prev => [...prev, challenge]);
    setCurrentIndex(previousChallenges.length + 1);

    // Trigger animation
    animateCard();

    // If all challenges have been used, show a message
    if (updatedChallenges.length === 0) {
      setTimeout(() => {
        alert("You've completed all challenges! Starting over...");
      }, 500);
    }
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#ad5389', '#3c1053']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.difficulty}>Starter Pack 🎮</Text>
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
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    }
                  ]}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.neverText}>
                      Never have I ever...
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.challengeText}>
                      {currentChallenge}
                    </Text>
                    
                    <View style={styles.packInfoContainer}>
                      <Text style={styles.packInfo}>
                        Starter Pack
                        <Text style={styles.packCount}> {currentIndex} / {CHALLENGES.length}</Text>
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              ) : (
                <Animated.View 
                  style={[
                    styles.challengeContainer,
                    {
                      opacity: fadeAnim,
                    }
                  ]}
                >
                  <Text style={styles.startText}>
                    Press Next to begin! 🎮
                  </Text>
                </Animated.View>
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
    paddingTop: 20
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
    transform: [{ translateX: 0 }], // Add this for Android shadow
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
    backgroundColor: '#FE96FF',
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
    color: '#FE96FF',
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
  remainingText: {
    color: '#666',
    fontSize: 14,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
}); 