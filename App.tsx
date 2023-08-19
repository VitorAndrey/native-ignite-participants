import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import uuid from 'uuid-random';

import Participant from './components/Participant';

export interface ParticipantType {
  id: string;
  name: string;
}

export default function App() {
  const [participantInput, setParticipantInput] = useState<string>('');

  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  function handleInputChange(text: string) {
    setParticipantInput(text);
  }

  function handleAddParticipant() {
    if (!participantInput) {
      return Alert.alert(
        'Operação inválida',
        'Não é possível adicionar participantes vazios.',
        [{text: 'OK'}],
      );
    }

    const existingParticipant = participants.find(
      participant => participant.name === participantInput,
    );

    if (existingParticipant) {
      setParticipantInput('');

      return Alert.alert(
        'Operação inválida',
        `${participantInput} já faz parte da lista de participantes`,
        [{text: 'OK'}],
      );
    }

    const participant = {id: uuid(), name: participantInput};
    setParticipants(prevState => [...prevState, participant]);
    setParticipantInput('');
  }

  function handleRemoveParticipant(id: string) {
    setParticipants(prevState =>
      prevState.filter(participant => participant.id !== id),
    );
  }

  const currentDate = new Date();

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nome do evento</Text>
        <Text style={styles.date}>{currentDate.toDateString()}</Text>
      </View>

      <View style={styles.participantInputContainer}>
        <TextInput
          style={styles.participantInput}
          onChangeText={handleInputChange}
          value={participantInput}
          placeholder="Nome do participante"
          placeholderTextColor={'#777777'}
        />

        <TouchableOpacity
          style={styles.addParticipantButton}
          onPress={handleAddParticipant}>
          <Text style={styles.addParticipantButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.participantsListContainer}>
        {participants.length < 1 ? (
          <Text style={styles.noParticipantsText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença .
          </Text>
        ) : (
          <FlatList
            data={participants}
            renderItem={({item}) => (
              <Participant
                item={item}
                onRemoveParticipant={handleRemoveParticipant}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    padding: 20,
  },
  titleContainer: {
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fefefe',
    marginBottom: 3,
  },
  date: {color: '#999999'},
  participantInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  participantInput: {
    backgroundColor: '#333333',
    borderRadius: 10,
    color: 'white',
    flex: 1,
    height: 60,
    padding: 20,
  },
  addParticipantButton: {
    width: 60,
    borderRadius: 10,
    backgroundColor: '#31CE67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addParticipantButtonText: {
    color: 'white',
    fontSize: 25,
  },
  noParticipantsText: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  participantsListContainer: {
    paddingVertical: 40,
  },
});
