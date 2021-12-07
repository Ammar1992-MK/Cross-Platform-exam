import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as SQLite from "expo-sqlite";
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [country, setCountry] = useState();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();

    function openDatabase() {
        if (Platform.OS === "web") {
            return {
                transaction: () => {
                    return {
                        executeSql: () => { },
                    };
                },
            };
        }

        const db = SQLite.openDatabase("db.db");
        return db;
    }
    const fetchFromDB = () => {

        const db = openDatabase();
        db.transaction(
            (tx) => {
                tx.executeSql("select * from userTable", [], (_, { rows }) => {
                    let lastInserted = rows._array.length - 1
                    const { name, email, country, image } = rows._array[lastInserted]
                    setName(name);
                    setEmail(email);
                    setCountry(country);
                    setImage(image);
                }
                );
            }
        )

    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            alert(errorMsg)
            console.log("wrong")
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation("location");
        const userInfoAndLocation = { ...location.coords, name, image }
        console.log(userInfoAndLocation);
        navigation.navigate("MapScreen", { userInfo: userInfoAndLocation })
    }

    useEffect(() => {
        fetchFromDB();
    }, [])
    return (
        <SafeAreaView style={styles.profileContainer}>
            <View style={styles.backBtnContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CovidDataScreen")}>
                    <Ionicons name="arrow-back" size={30} color={"#eac454"} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={{ uri: image }} style={styles.ProfileImage} />
                    <Text style={styles.infoText}> {name}</Text>
                </View>
                <View style={styles.emailContainer}>
                    <Ionicons name="mail" size={30} color={"grey"} />
                    <Text style={styles.infoText}>{email}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <Ionicons name="location" size={30} color={"grey"} />
                    <Text style={styles.infoText}>{country}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.location} onPress={getLocation}>
                <View>
                    <Text style={styles.locationText}>See your location on covid map</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

    profileContainer: {

        flex: 1,
        backgroundColor: '#1f232b',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContainer: {
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#1f232b",
        borderBottomColor: "#eac454",
    },
    profileImageContainer: {
        width: "50%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
    },
    ProfileImage: {
        width: "70%",
        height: "50%",
        borderRadius: 100
    },
    infoText: {
        color: "#eac454",
        fontSize: 20,
        fontWeight: "700",

    },
    userInfoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "50%",
        width: "50%",
        borderColor: "#eac454",
        borderWidth: 2,
    },
    emailContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    locationContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    location: {
        width: "50%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 13
    },
    locationText: {

        color: "#eac454",
        fontSize: 13,
        fontWeight: "700",
    },
    backBtnContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    }



})
