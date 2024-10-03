import { Link, Stack } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

//const polls = [{id: 1},{id: 2},{id: 3},{id: 4}];

export default function HomeScreen() {
  const [polls, setPolls] = useState([]);

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
      }} />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle} >{item.id}Question Poll Example</Text>
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
