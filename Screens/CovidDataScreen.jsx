import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import useApi from '../Hooks/useApi';
import getCovidData, { Api } from '../Api/CovidApi';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as Actions from '../Redux/actions';
import DataList from '../Components/DataList';



function CovidDataScreen(props) {

    const navigation = useNavigation();

    const systemApi = Api();

    const { reload, loading, error, lastUpdated, data: covidData } = useApi(async () => await systemApi.getCovidData());
    const [showSearch, setShowSearch] = useState(false);
    const [input, setInput] = useState("");


    const toggleSearchBar = () => {
        setShowSearch(true)
    };

    //Save data to Redux
    props.updateData(covidData);


    //seach data
    const searchCovidData = () => {
        return covidData.filter(item => item.country.includes(input));
    };


    if (error) {
        return <View><Text>{error}</Text></View>
    }
    if (loading) {
        return <SafeAreaView style={styles.container}>
            <Text style={{ color: "#eac454", fontSize: 15, fontWeight: "700" }}>Loading...</Text>
        </SafeAreaView>
    }
    return (
        <SafeAreaView style={styles.container}>
            {!showSearch && <TouchableOpacity onPress={toggleSearchBar}>
                <Ionicons name="search" size={30} color={"#eac454"} />
            </TouchableOpacity>}
            {showSearch &&
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("MapScreen", { mapdata: covidData })}>
                        <Ionicons name="location" size={30} color={"#eac454"} />
                    </TouchableOpacity>
                    <View style={styles.searchBarContainer}>
                        <Ionicons name="search" size={30} color={"#eac454"} />
                        <TextInput placeholder="Enter country name" style={styles.input} onChange={searchCovidData} onChangeText={text => setInput(text)} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                            <Ionicons name="person" size={30} color={"#eac454"} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <View>
                <Text style={styles.lastUpdated}>Last updated : {lastUpdated}</Text>
            </View>
            <DataList data={searchCovidData()} refreshData={reload} loading={loading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f232b',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? 100 : 0,
    },
    headerContainer: {

        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 50
    },
    searchBarContainer: {
        width: "70%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#eac454",
        borderWidth: 2,
        borderRadius: 12,
    },
    input: {
        width: "85%",
        height: "100%",
        color: "#fff",
        fontSize: 20
    },
    listContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === "android" ? 100 : 25,
    },
    lastUpdated: {
        marginTop: 10,
        color: "#7f807d"
    }

})


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({

    updateData: sharedData => dispatch({
        type: Actions.UPDATE_DATA, payload: {
            sharedData
        }
    })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(CovidDataScreen)