import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

export default function CovidDataScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Covid data screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

})
