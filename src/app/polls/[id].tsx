import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";

const poll ={
    question: 'Favorite CMS',
    options:['Wordpress', 'Drupal', 'Joomla'],
}

export default function PollDetaila(){
    const {id} = useLocalSearchParams<{id:string}>();
    const [selected, setSelected] = useState('Wordpress');
    const vote =()=>{
        console.warn('Vote: ', selected)
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