import React from 'react';
import {Pressable, StyleSheet, View, Text} from "react-native";
import LoadingComponent from "./LoadingComponent";

const LoadingButton = ({children, wrapperStyle, onPress, textWhenLoading, loading}) => {
    return (
        <Pressable onPress={onPress}>
            <View style={[defaultWrapperStyle.wrapper, wrapperStyle]}>
                {loading ?
                    <View>
                        <LoadingComponent/>
                        {textWhenLoading && <Text>{textWhenLoading}</Text>}
                    </View> : children
                }
            </View>
        </Pressable>
    );
};

const defaultWrapperStyle = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: "#bebebe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    }
})

export default LoadingButton;
