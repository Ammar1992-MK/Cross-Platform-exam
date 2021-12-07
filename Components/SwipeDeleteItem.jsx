import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export default function SwipeDeleteItem({ deleteItem }) {
    return (
        <TouchableOpacity onPress={deleteItem}>
            <View style={styles.swipeContainer}>
                <View style={styles.deleteIcon}>
                    <Ionicons name="trash" size={30} color={"white"} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    swipeContainer: {
        width: 100,
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    deleteIcon: {

        backgroundColor: "red",
        width: "50%",
        height: "35%",
        borderRadius: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"

    }
})
