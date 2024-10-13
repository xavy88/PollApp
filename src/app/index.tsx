import { Link, Stack } from 'expo-router';
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
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
          backgroundColor: '#1F2937',
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
      
      <Image
          style={{width: 410, height: '30%'}}
          source={{uri:'https://static.vecteezy.com/system/resources/previews/001/829/795/large_2x/people-fly-flag-to-choose-yes-or-no-to-give-feedback-online-polling-mobile-apps-to-choose-to-agree-or-disagree-on-an-issue-or-problem-illustration-for-web-landing-page-banner-mobile-apps-free-vector.jpg'}}
      />
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
    backgroundColor: '#111827',
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    padding: 10,
    borderRadius: 5,
    borderWidth:1,
    backgroundColor: '#1F2937',
    borderColor:'#818CF8'
  },
  pollTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
