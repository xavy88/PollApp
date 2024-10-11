import { Link, Stack } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Poll } from '../types/db';



export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('Fetching data...');

      let { data, error } = await supabase
        .from('polls')
        .select('*')
      if (error) {
        Alert.alert('Error fetching data...');
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);
  return (
    <>
      <Stack.Screen options={{
        title: 'Polls',
        headerTitleAlign: 'center',
        headerRight: () =>
          <Link href={'/polls/new'}>
            <Entypo name="circle-with-plus" size={24} color="white" />
          </Link>
        ,
        headerStyle: {
          backgroundColor: '#09b4e8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerLeft:() =>
          <Link href={'/profile'}>
            <EvilIcons name="user" size={30} color="white" />
          </Link>
      }} />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <EvilIcons name="question" size={16} color="white" />
            <Text style={styles.pollTitle} >{item.question}</Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0652',
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#09b4e8',
  },
  pollTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
