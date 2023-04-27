import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";

const ToViewList = () => {
    return (
        <View>
           <Text style={{fontSize: 20}}>В разработке</Text>
            <ActivityIndicator size={"large"} color={"#0000ff"}/>
        </View>
    );
};

export default ToViewList;
