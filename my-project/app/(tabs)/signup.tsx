import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Text, ScrollView, StatusBar, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/database/firebaseConfig';
import { router } from 'expo-router';


export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState<String>('');
  const [lastname, setLastname] = useState<String>('');
  const [username, setUsername] = useState<String>('');
  const [isLoading, setIsLoading] = useState(false);

  const signuphandler = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth)
      const user = userCredential.user;
      alert('สมัครสำเร็จ');

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        firstname,
        lastname,
        createdAt: new Date(),
      });
      console.log('✅ สมัครสำเร็จและบันทึกข้อมูลเพิ่มแล้ว');
      router.replace('/');
    } catch (error: any) {
      console.error('❌ สมัครไม่สำเร็จ:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <View style={{ flex: 1, margin: 10 }}>
            <Text style={styles.title}>Signup</Text>
            <View>
              <Text style={styles.text}>Username</Text>
              <TextInput style={styles.textinput} onChangeText={setUsername}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Email</Text>
              <TextInput style={styles.textinput} onChangeText={setEmail}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Firstname</Text>
              <TextInput style={styles.textinput} onChangeText={setFirstname}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Lastname</Text>
              <TextInput style={styles.textinput} onChangeText={setLastname}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>password</Text>
              <TextInput style={styles.textinput} onChangeText={setPassword}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Confirm password</Text>
              <TextInput style={styles.textinput} onChangeText={setPassword}></TextInput>
            </View>
            {isLoading ? (<ActivityIndicator size="large" color="#841584"></ActivityIndicator>
            ) : (
              <Button
                onPress={signuphandler}
                title="Signup"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />)}

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 10,
    // paddingTop: StatusBar.currentHeight,
  },
  // scrollView: {
  //   backgroundColor: 'pink',
  // },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    padding: 2,
  },
  textinput: {
    fontSize: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
