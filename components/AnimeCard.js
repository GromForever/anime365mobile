import React, {useCallback, useEffect, useRef, useState} from "react"
import {ScrollView, StyleSheet, Text, View, Image as NativeImage} from "react-native";
import {Image} from "expo-image"
import badImage from "../assets/Icon/Errors/error1.png";

const AnimeCard = React.memo( ({animeInfo}) => {
    const [imageUrl, setImageUrl] = useState(animeInfo.posterUrl);
    const RatingColor = (rating) => {
        const floatRating = parseFloat(rating)
        switch (true) {
            case floatRating > 7.8: return Styles.section.ratingAwesome;
            case floatRating > 6.9: return Styles.section.ratingGood;
            case floatRating > 5.9: return Styles.section.ratingNormal;
            default: return Styles.section.ratingBad
        }
    }

    const HandleFetchImageError = useCallback(() => {
        setImageUrl(NativeImage.resolveAssetSource(badImage).uri)
    })
    return (
            <View style={Styles.view}>
                <Image contentFit={"cover"} onError={HandleFetchImageError} placeholder={{uri: animeInfo.posterUrlSmall}} transition={250} source={{uri: imageUrl}} style={Styles.image}></Image>
                <Text numberOfLines={1} style={Styles.title}>{animeInfo?.titles?.ru}</Text>
                <Text numberOfLines={1} style={Styles.subTitle}>{animeInfo?.titles?.romaji}</Text>
                {<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {animeInfo.genres?.map((item) => <View key={item.id} style={Styles.genresBlock}>
                        <Text>
                            {item.title}
                        </Text>
                    </View>)}
                </ScrollView>}
                <View style={Styles.section.main}>
                    <View style={Styles.section.mainChild}>
                        <Text style={Styles.section.year}>{animeInfo?.year} г.</Text>
                        <Text style={RatingColor(animeInfo.myAnimeListScore)}>{parseFloat(animeInfo?.myAnimeListScore)}</Text>
                    </View>
                </View>
            </View>
    );
})

const Styles = StyleSheet.create({
    view: {
        borderRadius: 19,
        backgroundColor: "#D2D2D2",
        marginHorizontal: 5,
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: 168,
        borderRadius: 19
    },
    title: {
        paddingTop: 5,
        paddingHorizontal: 7,
        fontSize: 16,
        fontWeight: "bold",
    },
    genresBlock: {
        marginHorizontal: 5,
        marginTop: 5,
        padding: 3,
        backgroundColor: "#5caf64",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    subTitle: {
        fontSize: 14,
        paddingTop: 5,
        paddingHorizontal: 7,
        fontWeight: "normal"
    },
    section: {
        main: {
            paddingTop: 10,
            paddingBottom: 5,
            paddingHorizontal: 10,
            width: "100%"
        },
        mainChild: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        year: {
            fontSize: 16,
            fontWeight: "bold"
        },
        ratingAwesome: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#4caf50"
        },
        ratingGood: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#4a148c"
        },
        ratingNormal: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#f57f17"
        },
        ratingBad: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#e53935"
        }
    }



})

export default AnimeCard;
