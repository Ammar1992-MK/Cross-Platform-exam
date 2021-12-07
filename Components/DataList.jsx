import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, Platform } from 'react-native'
import DataItem from './DataItem'
import SwipeDeleteItem from './SwipeDeleteItem'

const DataList = ({ data, deleteObject }) => {

    const [filteredData, setFilteredData] = useState(data);

    return (
        <SafeAreaView style={styles.listContainer} >
            <View >
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <DataItem
                            item={item}
                            renderRightAction={() =>
                                <SwipeDeleteItem deleteItem={() => deleteObject(item.country)} />
                            }

                        />
                    )
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default DataList

const styles = StyleSheet.create({

    listContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === "android" ? 100 : 25,
    }

})
