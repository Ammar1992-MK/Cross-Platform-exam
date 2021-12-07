import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Geojson } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import geos from '../assets/countriesGeo.json'

function MapScreen(props) {

    const navigation = useNavigation();

    const { userInfo } = props.route.params;

    const handleCountryColor = (index, item) => {
        let countryColor = ""
        props.sharedData.map((data) => {

            if (item.properties.name === data.country) {

                if ((data.population / data.cases) < 25 && (data.population / data.cases) >= 20) {
                    countryColor = "#fc0f03"
                } else if ((data.population / data.cases) < 20 && (data.population / data.cases) >= 15) {
                    countryColor = "#d77606"
                } else if ((data.population / data.cases) < 15 && (data.population / data.cases) >= 10) {
                    countryColor = "#d4c700"
                } else if ((data.population / data.cases) < 10 && (data.population / data.cases) >= 0) {
                    countryColor = "#09b300"
                } else {
                    countryColor = "#1769c6"
                }
            }
        })



        return (
            <Geojson
                key={index}
                geojson={{ type: "FeatureCollection", features: [item] }}
                strokeColor="#0568AE"
                fillColor={countryColor}
                strokeWidth={2}
            />
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.backIconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CovidDataScreen")}>
                    <Ionicons name="arrow-back" size={30} color={"#eac454"} size={35} />
                </TouchableOpacity>
            </View>
            <MapView style={styles.map}
                initialRegion={
                    userInfo &&
                    {
                        latitude: userInfo.latitude,
                        longitude: userInfo.longitude,
                        latitudeDelta: 100.0,
                        longitudeDelta: 100.0
                    }}

            >

                {geos.features.map((item, index) =>
                    handleCountryColor(index, item)
                )}
                {userInfo && <Marker
                    coordinate={{
                        latitude: userInfo.latitude,
                        longitude: userInfo.longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                >
                    <View style={styles.markerCustomView}>
                        <Image source={{ uri: userInfo.image }} style={styles.userImage} />
                        <Text>{userInfo.name}</Text>
                    </View>

                </Marker>}
            </MapView>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000309',
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
    backIconContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 50
    },
    markerCustomView: {
        width: 200,
        height: 70,
        backgroundColor: "#eac454",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 20
    },
    userImage: {
        width: "40%",
        height: "90%",
        borderRadius: 100
    },
    markerText: {

    }
})

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(MapScreen);