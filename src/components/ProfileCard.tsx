import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { ProfileType } from '../context/ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function ProfileCard({ profile }: { profile: ProfileType | undefined }) {
    if (!profile) return <Text>Loading...</Text>;

    const getPreferenceTags = () => {
        const tags: string[] = [];
        const prefs = profile.preferences;

        if (prefs.scheduleRegularity <= 33) tags.push('#structured');
        if (prefs.scheduleRegularity >= 66) tags.push('#flexible');
        if (prefs.sleepSchedule <= 33) tags.push('#early_riser');
        if (prefs.sleepSchedule >= 66) tags.push('#night_owl');
        if (prefs.cleanliness <= 33) tags.push('#clean_freak');
        if (prefs.cleanliness >= 66) tags.push('#messy_nessy');
        if (prefs.socialLevel <= 33) tags.push('#introvert');
        if (prefs.socialLevel >= 66) tags.push('#extrovert');
        if (prefs.noiseLevel <= 33) tags.push('#calm_home');
        if (prefs.noiseLevel >= 66) tags.push('#lively_home');

        if (profile.rules.noPets) tags.push('#no_pets');
        if (profile.rules.noRoommates) tags.push('#no_roommates');
        if (profile.rules.noOvernightGuests) tags.push('#no_overnight_guests');

        return tags;
    };

    return (
        <LinearGradient
            colors={['#F87575', '#75F8B5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
        >
            <View style={styles.content}>
                <Text style={styles.title}>{profile.fullName || 'Your Name'}</Text>

                <View style={styles.iconRow}>
                    <Entypo name="circle-with-cross" size={45} color="#c23b3b" />
                    <Image
                        style={styles.profilePicPlaceholder}
                        source={{
                            uri: profile.profilePicture || 'https://placehold.co/150',
                        }}
                    />
                    <AntDesign name="checkcircle" size={40} color="#2e9c6a" />
                </View>

                <Text style={styles.emojis}>
                    {profile.personalityTraits?.map((trait) => {
                        const emojiMap: Record<string, string> = {
                            artistic: '🎨',
                            outdoorsy: '🌲',
                            bookworm: '📖',
                            gymRat: '💪',
                            gamer: '🎮',
                            musical: '🎵',
                        };
                        return emojiMap[trait] || '';
                    }).join(' ')}
                </Text>

                <View style={styles.tagsContainer}>
                    {getPreferenceTags().map((tag) => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <TextInput
                    style={styles.textBox}
                    value={profile.description}
                    placeholder="No description provided."
                    editable={false}
                    multiline
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
    },
    content: {
        flex: 1,
        padding: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 5,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    profilePicPlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#4AC4C5',
    },
    emojis: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
    },
    tag: {
        backgroundColor: '#F6B151',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 4,
    },
    tagText: {
        color: '#333',
        fontWeight: '500',
    },
    textBox: {
        backgroundColor: '#FDF4E3',
        borderRadius: 15,
        padding: 10,
        fontSize: 16,
        height: 190,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
});
