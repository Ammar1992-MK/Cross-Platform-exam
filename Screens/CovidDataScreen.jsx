import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import useApi from '../Hooks/useApi';
import getCovidData, { Api } from '../Api/CovidApi';
import DataList from '../Components/DataList'
import DataItem from '../Components/DataItem';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as Actions from '../Redux/actions';


function CovidDataScreen(props) {

    const navigation = useNavigation();

    const systemApi = Api();

    const { loading, error, data: covidData } = useApi(async () => await systemApi.getCovidData());
    const [fetchedData, setFetchedData] = useState([]);
    const [dataError, setDataError] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [input, setInput] = useState("");
    const [newData, setNewData] = useState([]);

    const toggleSearchBar = () => {
        setShowSearch(true)
    }

    //Save data to Redux
    props.updateData(covidData);


    useEffect(() => {

        setFetchedData(covidData);


    }, [])

    //seach data
    const searchCovidData = () => {
        const newData = covidData.filter(item => item.country.includes(input));
        setFetchedData(newData);
        setNewData(newData);
    }

    //delete
    const deleteData = (itemToDelete) => {
        const newData = fetchedData.filter(item => item.country !== itemToDelete);
        setFetchedData(newData);
        setNewData(newData);
    }

    if (error) {
        return <View><Text>{dataError}</Text></View>
    }
    if (loading) {
        return <View><Text>loading...</Text></View>
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
            <DataList data={covidData} deleteObject={deleteData} />
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