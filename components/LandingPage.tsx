import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import IonIcons from '@expo/vector-icons/Ionicons';


const { width } = Dimensions.get('window');

interface LandingPageProps {
  intro_sentences: string[];
  icon: string[];
  title: string[];

}

function LandingPage({ intro_sentences,icon, title }: LandingPageProps) {
  const [currentSentence, setCurrentSentence] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState<string | null>("");
  const [currentTitle, setCurrentTitle] = useState<string | null>("");

  
  // Animation values
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {


    nextSentence();
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

  const nextSentence = () => {
    if (currentIndex >= intro_sentences.length) {
      router.push('/game_modes');
    } else {
      setCurrentSentence(intro_sentences[currentIndex]);
      setCurrentIcon(icon[currentIndex]);
      setCurrentTitle(title[currentIndex]); 
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    animateCard();
  };

  const renderBulletPoints = () => {
    return (
      <View style={styles.bulletPointContainer}>
        {intro_sentences.map((_, index) => (
          <View
            key={index}
            style={[
              styles.bulletPoint,
              index === currentIndex - 1 ? styles.activeBulletPoint : {}
            ]}
          />
        ))}
      </View>
    );
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
              {currentSentence ? (
                <>
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
  <View style={styles.contentWrapper}>
    <Text style={styles.title}>{currentTitle}</Text>  
    <IonIcons name={currentIcon as any} size={100} color="#78ffd6" style={{ paddingBottom: 20 }} />
    <Text style={styles.challengeText}>{currentSentence}</Text>
  </View>

  <View style={styles.bottomWrapper}>
    <View style={styles.divider} />
    {renderBulletPoints()}
  </View>
</View>
                </Animated.View>

                <TouchableOpacity 
                  style={styles.button}
                  onPress={nextSentence}
                >
                  <Text style={styles.buttonText}>
                    Continue
                  </Text> 
                  <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
                </>
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
    paddingTop: 80
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
    width: '90%', // Reduce width for better visibility
    height: 500,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
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
    alignItems: 'center', // Center text and icon
    paddingHorizontal: 20,
  },
  
  // New container for text & icon
  contentWrapper: {
    flex: 1, 
    justifyContent: 'center', // Centers text and icon
    alignItems: 'center',
    gap: 30
  },
  
  bottomWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end', // Pushes to bottom
    marginTop: 'auto', // Ensures it stays at the bottom
  },
  
  challengeText: {
    color: 'white',
    fontSize: 20, // Adjusted size for better readability
    lineHeight: 38, // More spacing
    textAlign: 'center', // Center the text
    marginTop: 10,
  },
  
  title: {
    color: 'white',
    fontSize: 26, // Make title more prominent
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10, // Add space between title and icon
  },
  startText: {
    color: 'white',
    alignSelf: 'center',
  },
  spacer: {
    height: 30,
  },
  divider: {
    height: 2,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    opacity: 0.6,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 4,
  },
  activeBulletPoint: {
    backgroundColor: '#78ffd6',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 50,
  },
  buttonText: {

    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  arrowIcon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  },

});

export default LandingPage;
