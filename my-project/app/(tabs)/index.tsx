import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, ScrollView, StatusBar, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/database/firebaseConfig';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('🔐 มี user login อยู่แล้ว:', user.email);
        router.replace('/profile'); // เปลี่ยนเส้นทางอัตโนมัติ
      } else {
        console.log('👤 ไม่มี user login');
        router.replace('/'); // ไปหน้า login ถ้ายังไม่ login
      }
    });

    return () => unsubscribe();
  }, []);



  const Loginhandler = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('เข้าสู่ระบบสำเร็จ');

      // 2. ดึงข้อมูล Firestore
      const docRef = doc(db, "users", user.uid); // เปลี่ยนเป็น collection ของ user
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("🎉 ข้อมูลผู้ใช้:", userData);

        // ส่งข้อมูลไปหน้า profile
        router.replace({
          pathname: '/profile',
          params: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
            email: user.email,
          },
        });
      } else {
        console.log("❌ ไม่พบข้อมูลผู้ใช้");
      }
    } catch (error: any) {
      console.error('❌ เข้าสู่ระบบล้มเหลว:', error.message);
      Alert.alert("Login failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, margin: 10 }}>
          <Text style={styles.title}>Login</Text>
          <View>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.textinput} onChangeText={setEmail}></TextInput>
          </View>
          <View>
            <Text style={styles.text}>password</Text>
            <TextInput style={styles.textinput} onChangeText={setPassword}></TextInput>
          </View>
          {isLoading ? (<ActivityIndicator size="large" color="#841584"></ActivityIndicator>
          ) : (
            <Button
              onPress={Loginhandler}
              title="Signup"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />)}
        </View>
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
  scrollView: {
    backgroundColor: 'pink',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 28,
    padding: 2,
  },
  textinput: {
    fontSize: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
