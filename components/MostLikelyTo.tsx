import { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface MostLikelyToGameProps {
  challenges: string[];
  title: string;
}

function MostLikelyToGame({ challenges, title }: MostLikelyToGameProps) {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [previousChallenges, setPreviousChallenges] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableChallenges, setAvailableChallenges] = useState<string[]>([...challenges]);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      setAvailableChallenges([...challenges]);
      setCurrentIndex(0);
      setPreviousChallenges([]);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    const challenge = availableChallenges[randomIndex];
    
    const updatedChallenges = availableChallenges.filter((_, index) => index !== randomIndex);
    setAvailableChallenges(updatedChallenges);
    
    setCurrentChallenge(challenge);
    setPreviousChallenges(prev => [...prev, challenge]);
    setCurrentIndex(previousChallenges.length + 1);

    animateCard();

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
            <Text style={styles.difficulty}>{title} 🎮</Text>
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
                      Who is most likely to...
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.challengeText}>
                      {currentChallenge}
                    </Text>
                    
                    <View style={styles.packInfoContainer}>
                      <Text style={styles.packInfo}>
                        {title}
                        <Text style={styles.packCount}> {currentIndex} / {challenges.length}</Text>
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
});

export default MostLikelyToGame;