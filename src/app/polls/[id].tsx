import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import { Poll, Vote } from "../../types/db";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

export default function PollDetaila() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [poll, setPoll] = useState<Poll>(null);
    const [userVote, setUserVote] = useState<Vote>(null);
    const [selected, setSelected] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchPolls = async () => {
            //console.log('Fetching data...');

            let { data, error } = await supabase
                .from('polls')
                .select('*')
                .eq('id', Number.parseInt(id))
                .single();
            if (error) {
                Alert.alert('Error fetching data...');
            }
            setPoll(data);
        };

        const fetchUserVote = async () => {

            let { data, error } = await supabase
                .from('votes')
                .select('*')
                .eq('poll_id', Number.parseInt(id))
                .eq('user_id', user?.id)
                .limit(1)
                .single();
            // if (error) {
            //     Alert.alert('Error fetching user vote');
            // }
            setUserVote(data);
            if (data) {
                setSelected(data.option);
            }
        }

        fetchPolls();
        fetchUserVote();
    }, []);

    const vote = async () => {
        const newVote = {
            option: selected,
            poll_id: poll.id,
            user_id: user?.id
        };
        if (userVote) {
            newVote.id = userVote.id;
        }
        // console.warn('Vote: ', selected);
        const { data, error } = await supabase
            .from('votes')
            .upsert([newVote])
            .select()
            .single();
        if (error) {
            Alert.alert("Failed to vote");
        }
        else {
            setUserVote(data);
            Alert.alert("Thank you for your vote");
        }
    }

    if (!poll) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Poll Voting',headerTintColor: '#ffffff',headerTitleStyle: {
    color: 'white'
  }, headerStyle: {
          backgroundColor: '#1F2937'
        },}} />
            <Text style={styles.question}>{poll.question}</Text>
            <View style={{ gap: 5 }}>
                {poll.options.map((option) => (
                    <Pressable onPress={() => setSelected(option)}
                        key={option} style={styles.optionContainer}>
                        <Feather name={option === selected ? "check-circle" : "circle"} size={18} color={option === selected ? "green" : 'gray'} />
                        <Text style={styles.optionText}>{option}</Text>
                    </Pressable>
                ))}
            </View>
            <View style={{ paddingTop:20 }}>
            <Button  onPress={vote} title="Vote"  />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#111827',
        minHeight:'100%',
    },
    question: {
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 5,
        color:'#fff',
    },
    optionContainer: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#1F2937',
       paddingBottom:20,
    },
    optionText:{
        color:'#fff',
    }
})