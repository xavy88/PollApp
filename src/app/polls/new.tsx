import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function CreatePoll(){
    const[question, setQuestion] = useState('');
    const [options, setOptions] = useState(["","",""]);

    const createPoll=()=>{
        console.warn('Create');
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Create a Poll'}} />
            <Text style={styles.label}> Title</Text>
            <TextInput value={question} onChangeText={setQuestion} style={styles.input} placeholder="Type your question here" />
            <Text style={styles.label}> Options</Text>
            {options.map((option, index) =>(
                <View key={index}  style={{justifyContent:'center'}}>
                <TextInput 
                value={option} 
                onChangeText={(text)=>{
                    const updated = [...options];
                    updated[index] = text;
                    setOptions(updated);
                }} style={styles.input}  placeholder={`Options ${index + 1}`}/>
                <Ionicons 
                name="close-circle" 
                size={30} 
                color="red" 
                onPress={()=>{
                  //delete the item based on the index  
                  const updated =[...options];
                  updated.splice(index, 1);
                  setOptions(updated);
                }}
                style={{position:"absolute", right:10,}               } />
                
                </View>
            ))}
            <Button onPress={() => setOptions([...options, ''])} title="Add more options" />
            <Button onPress={createPoll} title="Create Poll" />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        gap:5,
    },
    label:{
        fontWeight:'600',
        marginTop:10,
    },
    input:{
        backgroundColor: 'white',
        padding:18,
        borderRadius:5,
        borderColor:'navy',
        borderWidth:1,
    },
})