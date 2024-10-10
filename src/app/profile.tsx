import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "@rneui/themed";
import { Redirect } from "expo-router";

export default function ProfileScreen(){

  const { user } = useAuth();

  if (!user) {
    return(
      <Redirect href="auth/login" />
    )
  }

    return(
        <View style={{padding:10}}>
            <Text>User ID: {user?.email}</Text>
            <Button title="Sign out" onPress={()=> supabase.auth.signOut()} />
        </View>
    )
}