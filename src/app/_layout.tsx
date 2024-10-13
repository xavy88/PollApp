import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { StatusBar } from "react-native";

export default function RootLayout(){
    return (
        <AuthProvider>
            <Stack>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                <Stack.Screen name="auth" options={{title:"Login"}} />
            </Stack>
        </AuthProvider>
    ); 
}