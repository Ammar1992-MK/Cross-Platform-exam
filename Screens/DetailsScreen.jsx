import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions } from 'react-native';
import { CountUp } from 'use-count-up';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel } from "victory-native";
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'expo-modules-core';

export default function DetailsScreen({ navigation, route }) {

    const { data } = route.params;

    const chartData = [
        {
            label: "cases",
            value: data.cases
        },
        {
            label: "deaths",
            value: data.deaths
        },
        {
            label: "critical",
            value: data.critical
        },
        {
            label: "recovered",
            value: data.recovered,
        },
        {
            label: "today",
            value: data.todayCases
        },
        {
            label: "active",
            value: data.active
        }]

    const chartTheme = {
        axis: {
            style: {
                tickLabels: {
                    // this changed the color of my numbers to white
                    fill: 'white',
                },
            },
        },
        chart: {
            style: {

            }
        }
    };
    const screenWidth = Dimensions.get("window").width;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headContainer}>
                <Image style={styles.countryFlag} source={{ uri: `${data.countryInfo.flag}` }} />
                <Text style={styles.countryName}>{data.country}</Text>
            </View>
            <View style={styles.mainMiddleContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftInnerContainer}>
                        <Text style={styles.titleText}>Total</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.cases}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.leftInnerContainer}>
                        <Text style={styles.titleText}>Active</Text>
                        <Text style={styles.titleValue} ><CountUp isCounting end={parseInt(`${data.active}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.leftInnerContainer}>
                        <Text style={styles.titleText}>Deaths</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.recovered}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.leftInnerContainer}>
                        <Text style={styles.titleText}>Recovered</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.cases}`)} duration={1.5} /></Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightInnerContainer}>
                        <Text style={styles.titleText}>Got tested</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.tests}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.rightInnerContainer}>
                        <Text style={styles.titleText}>Today cases</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.todayCases}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.rightInnerContainer}>
                        <Text style={styles.titleText}>Today deaths</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.todayDeaths}`)} duration={1.5} /></Text>
                    </View>
                    <View style={styles.rightInnerContainer}>
                        <Text style={styles.titleText}>Today recovered</Text>
                        <Text style={styles.titleValue}><CountUp isCounting end={parseInt(`${data.todayRecovered}`)} duration={1.5} /></Text>
                    </View>
                </View>
            </View>
            <VictoryChart style={{ backgroundColor: "#fff" }} theme={chartTheme}>
                <VictoryBar
                    style={{ data: { fill: "#eac454", width: 15 } }}
                    animate={{
                        duration: 3000,
                        onLoad: {
                            duration: 3000,
                        }
                    }}
                    data={chartData}
                    width={screenWidth / 2}
                    colorScale={"#fff"}
                    x="label"
                    y="value"
                >

                </VictoryBar>
            </VictoryChart>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f232b',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    headContainer: {
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Platform.OS === "android" ? 50 : 0,

    },

    countryFlag: {
        width: "20%",
        height: "50%",
        borderRadius: 100,
    },

    countryName: {
        color: "#eac454",
        fontSize: 30,
        fontWeight: "600"
    },
    mainMiddleContainer: {
        width: "100%",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#eac454",
    },
    leftContainer: {

        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    leftInnerContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightContainer: {

        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    rightInnerContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleText: {
        color: "#eac454",
        fontSize: 15,
        fontWeight: "700",
    },
    titleValue: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        fontStyle: "italic"
    }
})
