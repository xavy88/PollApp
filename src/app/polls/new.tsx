import { Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";


export default function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(["", "", ""]);
    const [error, setError] = useState('');

    const { user } = useAuth();

    const createPoll = async () => {
        setError('');
        if (!question) {
            setError('Please provide at least one question');
        }
        const validOptions = options.filter((o) => !!o);
        if (validOptions.length < 2) {
            setError('Please provide at least 2 valid optios')
        }


        const { data, error } = await supabase
            .from('polls')
            .insert([
                { question, options: validOptions },
            ])
            .select();

            if (error) {
                Alert.alert('Failed to create the poll');
                console.log(error);
                return;
            }
            router.back();


        console.warn('Create');
    }

    if (!user) {
        return (
            <Redirect href="auth/login" />
        )
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Create a Poll' }} />
            <Text style={styles.label}> Title</Text>
            <TextInput value={question} onChangeText={setQuestion} style={styles.input} placeholder="Type your question here" />
            <Text style={styles.label}> Options</Text>
            {options.map((option, index) => (
                <View key={index} style={{ justifyContent: 'center' }}>
                    <TextInput
                        value={option}
                        onChangeText={(text) => {
                            const updated = [...options];
                            updated[index] = text;
                            setOptions(updated);
                        }} style={styles.input} placeholder={`Options ${index + 1}`} />
                    <Ionicons
                        name="close-circle"
                        size={30}
                        color="red"
                        onPress={() => {
                            //delete the item based on the index  
                            const updated = [...options];
                            updated.splice(index, 1);
                            setOptions(updated);
                        }}
                        style={{ position: "absolute", right: 10, }} />

                </View>
            ))}
            <Button onPress={() => setOptions([...options, ''])} title="Add more options" />
            <Button onPress={createPoll} title="Create Poll" />

            <Text style={{ color: "red" }}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5,
    },
    label: {
        fontWeight: '600',
        marginTop: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 5,
        borderColor: 'navy',
        borderWidth: 1,
    },
})