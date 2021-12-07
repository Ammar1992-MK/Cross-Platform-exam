import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type props = {
    title: String,
    destination: String,
}

const NavigationButton = ({ title, destination }: props) => {
    const navigation = useNavigation();
    return (

        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(`${destination}`)}>
            <View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NavigationButton

const styles = StyleSheet.create({

    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        height: "5%",
        borderRadius: 15,
        borderColor: "#c5c4c4",
        borderWidth: 1

    },
    text: {
        color: "#ffffff",
        textTransform: "capitalize",
        fontSize: 17,
    }
})
