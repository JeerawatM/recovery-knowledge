import { auth } from '@/database/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProfileScreen() {
    const { firstname, lastname, username, email } = useLocalSearchParams();
    const logouthandler = async () => {
        try {
            await auth.signOut();
            alert('ออกจากระบบสำเร็จ');
        } catch(error: any) {
            console.error('❌ ออกจากระบบล้มเหลว:', error.message);
        }
        router.replace('/');

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>your Firstname : {firstname}</Text>
            <Text style={styles.text}>your Lastname : {lastname}</Text>
            <Text style={styles.text}>your Username : {username}</Text>
            <Text style={styles.text}>your Email : {email}</Text>
            <Button title="Go to Setting" onPress={() => router.push('/setting')}></Button>
            <Button title="logout" onPress={logouthandler}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
