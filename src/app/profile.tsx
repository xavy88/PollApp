import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
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
        <View style={{padding:20}}>
          <Image
          style={{width: '100%', height: '80%'}}
          source={{uri:'https://www.shutterstock.com/image-vector/mobile-app-account-registered-successfully-600nw-2313296639.jpg'}}
      />
            <Text style={{padding:8, fontWeight:'bold', fontSize:18}}>User ID: {user?.email}</Text>
            <Button title="Sign out" onPress={()=> supabase.auth.signOut()} />
        </View>
    )
}