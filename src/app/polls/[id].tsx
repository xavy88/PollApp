import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import { Poll } from "../../types/db";
import { supabase } from "../../lib/supabase";

export default function PollDetaila(){
    const {id} = useLocalSearchParams<{id:string}>();
    const [poll, setPoll] = useState<Poll>(null);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const fetchPolls = async () => {
          console.log('Fetching data...');
    
          let { data, error } = await supabase
            .from('polls')
            .select('*')
            .eq('id', id)
            .single();
          if (error) {
            Alert.alert('Error fetching data...');
          }
          setPoll(data);
        };
        fetchPolls();
      }, []);

    const vote =()=>{
        console.warn('Vote: ', selected)
    }

    if (!poll) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title:'Poll Voting'}}/>
            <Text style={styles.question}>{poll.question}</Text>
            <View style={{gap: 5}}>
            {poll.options.map((option)=>(
                <Pressable onPress={()=>setSelected(option)}
                key={option} style={styles.optionContainer}>
                    <Feather name={option === selected ? "check-circle" : "circle"} size={18} color={ option === selected ? "green" : 'gray'} />
                       <Text>{option}</Text> 
                </Pressable>
            ))}
            </View>
            <Button onPress={vote} title="Vote" />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    question:{
        fontSize:20,
        fontWeight:'600',
        paddingBottom:5,
     },
    optionContainer:{
        backgroundColor: 'white',
        padding:10,
        borderRadius:5,
        flexDirection:'row',
        alignItems: 'center',
        gap: 10,
    },
})