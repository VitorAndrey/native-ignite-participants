import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

interface ParticipantProps {
  item: {
    name: string;
    id: string;
  };
  onRemoveParticipant: (id: string) => void;
}

export default function Participant({
  item,
  onRemoveParticipant,
}: ParticipantProps) {
  return (
    <View style={styles.participantContainer}>
      <Text style={styles.participantText}>{item.name}</Text>

      <TouchableOpacity
        style={styles.addParticipantButton}
        onPress={() => onRemoveParticipant(item.id)}>
        <Text style={styles.addParticipantButtonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  participantContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  participantText: {
    backgroundColor: '#333333',
    borderRadius: 10,
    color: 'white',
    height: 60,
    padding: 20,
    flex: 1,
  },
  addParticipantButton: {
    width: 60,
    borderRadius: 10,
    backgroundColor: '#e33b45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addParticipantButtonText: {
    color: 'white',
    fontSize: 25,
  },
});
