import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native'

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Start Screen</Text>
            <Button title="Go to covid data" onPress={() => navigation.navigate("CovidDataScreen")} />
        </SafeAreaView>
    )
}

export default StartScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



