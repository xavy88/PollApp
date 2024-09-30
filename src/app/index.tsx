import { Link, Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const polls = [{id: 1},{id: 2},{id: 3},{id: 4}];

export default function HomeScreen() {
  return (
    <>
    <Stack.Screen options={{title:'Polls',
      headerStyle:{
        backgroundColor:'#09b4e8',
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
        fontWeight:'bold',
        fontSize:25,
      },
    }} />
     <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item} ) => (
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
    gap:5,
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
