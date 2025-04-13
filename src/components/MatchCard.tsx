import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function MatchCard() {
  return (
    <View style={styles.cardContainer}>
      {/* Top Row */}
      <View style={styles.topRow}>

        {/*Input photo from firebase */}
        <View style={styles.blueBox} />

        {/*Input real name from firebase */}
        <Text style={styles.nameText}>Alex Johnson</Text>

        <TouchableOpacity style={styles.iconWrapper}>
          <Fontisto name="email" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tags Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsRow}
      >
        {/*Input tags from firebase here */}
        <View style={styles.tag}><Text style={styles.tagText}>#clean_freak</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>#night_owl</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>#introvert</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>#no_dogs</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>#is_quiet</Text></View>
      </ScrollView>

      {/* Input description here from firebase */}
      <View style={styles.descriptionBox}>
        <ScrollView
            style={styles.descriptionScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.descriptionText}>
            I love painting, hiking, and reading. Always down for a calm weekend and good conversation.
            Sometimes I write long things to see how it scrolls when the box fills up with way too much
            info that nobody asked for but here it is anyway because maybe someone actually does want to
            know how long this description can go before it overflows.
            </Text>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#4AC4C5',
      borderRadius: 16,
      padding: 16,
      margin: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    blueBox: {
      width: 35,
      height: 35,
      backgroundColor: '#007AFF',
      borderRadius: 4,
      marginRight: 10,
    },
    nameText: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    iconWrapper: {
      padding: 4,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12,
      gap: 8,
    },
    tag: {
      backgroundColor: '#09ECEC',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    tagText: {
      fontSize: 12,
      color: '#000000',
    },
    descriptionBox: {
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        maxHeight: 100, // limit box height so scrolling can happen
      },
    descriptionScroll: {
    maxHeight: 100, // smaller than descriptionBox to allow inner scroll
    },
    descriptionText: {
      fontSize: 14,
      color: '#333',
    },
  });
  