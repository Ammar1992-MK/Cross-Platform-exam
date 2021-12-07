import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useNavigation } from '@react-navigation/native'

const DataItem = ({ item, renderRightAction }) => {

    const navigation = useNavigation();
    return (
        <Swipeable renderRightActions={renderRightAction}>
            <TouchableOpacity onPress={() => navigation.navigate("DetailsScreen", { data: item })}>
                <View style={styles.itemContainer}>
                    <View style={styles.countryInfo}>
                        <Text style={styles.countryName}>{item.country}</Text>
                        <Image style={styles.flag} source={{ uri: `${item.countryInfo.flag}` }} />
                    </View>
                    <View style={styles.numbers}>
                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalNumber}>{item.cases}</Text>
                        </View>
                        <View style={styles.active}>
                            <Text style={styles.activeText}>Active</Text>
                            <Text style={styles.activeNumber}>{item.active}</Text>
                        </View>
                        <View style={styles.deaths}>
                            <Text style={styles.deathsText}>Deaths</Text>
                            <Text style={styles.deathsNumber}>{item.deaths}</Text>
                        </View>
                        <View style={styles.recovered}>
                            <Text style={styles.recoveredText}>Recovered</Text>
                            <Text style={styles.recoveredNumber}>{item.recovered}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default DataItem

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#2e3440",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#eac454",
        marginBottom: 30

    },
    countryInfo: {

        width: "50%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5
    },
    flag: {
        width: "20%",
        height: "100%",

    },
    countryName: {
        color: "#fff",
        fontSize: 20
    },
    numbers: {

        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5
    },

    total: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        marginBottom: 5
    },
    active: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        marginBottom: 5
    },
    deaths: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        marginBottom: 5
    },
    recovered: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        marginBottom: 5
    },
    totalText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700"
    },
    totalNumber: {
        color: "#fff",
        fontWeight: "700"
    },
    activeText: {
        fontSize: 17,
        color: "#7fa4df",
        fontWeight: "700"
    },
    activeNumber: {
        color: "#7fa4df",
        fontWeight: "700"
    },
    deathsText: {
        fontSize: 17,
        color: "#ff6b81",
        fontWeight: "700"
    },
    deathsNumber: {
        color: "#ff6b81",
        fontWeight: "700"
    },
    recoveredText: {
        fontSize: 17,
        color: "#95f9a2",
        fontWeight: "700"
    },
    recoveredNumber: {
        color: "#95f9a2",
        fontWeight: "700",
    }

})
