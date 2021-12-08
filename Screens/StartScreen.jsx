import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from "expo-sqlite";

const StartScreen = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const navigation = useNavigation();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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

    const getImagePermession = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const saveUserToDB = () => {
        {/**
            if (name === "" || email === "" || country === "") {

            alert("Maybe you forgot to provide some info :)")
            return;
        }
         */}

        const user = {
            name: name,
            email: email,
            country: country,
            image: image,
        }
        const db = openDatabase();
        db.transaction(
            (tx) => {
                tx.executeSql("insert into userTable (name, email, country, image) values (?, ?, ?, ?)", [user.name, user.email, user.country, user.image]);

            },
            null
        );

        navigation.navigate("CovidDataScreen");
    }

    useEffect(() => {
        getImagePermession();

        const db = openDatabase();

        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists userTable (id integer primary key not null,name text, email text, country text, image text);"
            );
        });
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.signUpForm}>
                <View style={styles.uploadImageContainer}>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.userImage} />}
                    </View>
                    <TouchableOpacity style={styles.uploadImageButton} onPress={pickImage}>
                        <Text style={styles.uploadImageButtonText}>Upload photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.inputLabel}> Name</Text>
                    <TextInput style={styles.formInput} onChangeText={text => setName(text)} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.inputLabel}>E-mail</Text>
                    <TextInput style={styles.formInputEmail} textContentType="emailAddress" onChangeText={text => setEmail(text)} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.inputLabel}>Country</Text>
                    <TextInput style={styles.formInput} onChangeText={text => setCountry(text)} />
                </View>
            </View>
            <TouchableOpacity style={styles.signUpBtn} onPress={saveUserToDB}>
                <View>
                    <Text style={styles.signUptext}>Join the trackrs</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f232b',
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-around",
    },

    signUpForm: {
        width: "100%",
        height: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    formInputContainer: {
        width: "90%",
        height: "15%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2e3440",
        justifyContent: "space-evenly"
    },
    formInput: {
        backgroundColor: "#2e3440",
        width: "70%",
        height: "100%",
        color: "#F0B90B",
        fontSize: 20,
        fontWeight: "700",
        textAlignVertical: "auto"

    },
    formInputEmail: {
        backgroundColor: "#2e3440",
        width: "70%",
        height: "100%",
        color: "#F0B90B",
        fontSize: 20,
        fontWeight: "700",
        textAlignVertical: "auto",
        textTransform: "lowercase",

    },
    inputLabel: {
        color: "#97a1b4",
        fontSize: 20,
        fontWeight: "700",
    },
    uploadImageContainer: {
        height: Platform.OS === "ios" ? "40%" : "45%",
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around"
    },
    imageContainer: {
        backgroundColor: "grey",
        width: "40%",
        height: "80%",
        borderRadius: 70
    },
    uploadImageButton: {

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        height: "20%",
    },
    uploadImageButtonText: {
        color: "#F0B90B",
        fontSize: 15,
        fontWeight: "700",
    },
    userImage: {
        width: "100%",
        height: "100%",
        borderRadius: 70
    },
    signUpBtn: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        height: "5%",
        borderRadius: 15,
        borderColor: "#c5c4c4",
        borderWidth: 1,
        backgroundColor: "#2e3440",
    },
    signUptext: {
        color: "#F0B90B",
        textTransform: "capitalize",
        fontSize: 17,
    }

});



