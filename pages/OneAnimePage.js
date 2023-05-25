import {Pressable, ScrollView, StyleSheet, Text, View, Image as NativeImage} from "react-native";
import {Image} from "expo-image"
import LoadingComponent from "../components/LoadingComponent";
import {useRoute} from "@react-navigation/native";
import useFetchOneAnime from "../hooks/useFetchOneAnime";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Feather} from '@expo/vector-icons';
import {useCallback, useEffect, useState} from "react";
import badImage from "../assets/Icon/Errors/error1.png"

const OneAnimePage = () => {
    const {id} = useRoute().params;
    const [anime, isLoading] = useFetchOneAnime(id)
    const [imageUrl, setImageUrl] = useState(null)
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        if (anime) {
            setImageUrl(anime.posterUrl)
        }
    }, [anime])

    const HandleFetchImageError = useCallback(() => {
        setImageUrl(NativeImage.resolveAssetSource(badImage).uri)
    })

    return (
        <ScrollView style={styles.container}>
            {isLoading ? <LoadingComponent/> : <>
            <Image style={styles.image} onError={HandleFetchImageError} source={{uri: imageUrl}} placeholder={{uri: anime?.posterUrlSmall}} contentFit={"cover"} transition={250}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)']}
                    style={styles.gradient}
                />
            </Image>
            <Text style={styles.title}>{anime?.titles.ru}</Text>
            <Text style={styles.subTitle}>{anime?.titles.romaji}</Text>
            <View style={styles.infoBlock}>
                <View style={styles.rating}>
                    <Text style={styles.ratingValue}>{anime?.myAnimeListScore == -1.0 ? "Без рейтинга" : parseFloat(anime?.myAnimeListScore).toFixed(1)}</Text>
                    <Feather name="star" size={18} color="#ffd700" />
                </View>
                <Text style={styles.studio}>{anime?.studio ?? ""}</Text>
                <Text style={styles.episodesCount}>{anime?.numberOfEpisodes ? anime?.numberOfEpisodes + " эпизодов" : ""}</Text>
                <Text style={styles.year}>{anime?.year ? anime?.year + " г." : ""}</Text>
            </View>
            <View style={styles.genresBlock}>
                {anime && anime.genres && anime?.genres.map((item) => {
                    return <View key={item.id} style={styles.genre}><Text>{item.title}</Text></View>
                })}
            </View>
            <Pressable>
                <View style={styles.watchButtonContainer}>
                    <View style={styles.watchButton}>
                        <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>Смотреть</Text>
                    </View>
                </View>
            </Pressable>
            <View style={[styles.descriptionBlock, isOpened ? styles.unlimitedHeight : styles.limitedHeight]}>
                <Text style={{textAlign: "center", fontSize: 14}}>{anime?.descriptions[0].value}</Text>
                {!isOpened && <>
                    <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 1)']}
                    style={styles.descriptionGradient}
                />
                <Pressable onPress={() => setIsOpened(true)}>
                    <View style={styles.downIcon}>
                        <AntDesign style={{zIndex: 100}} name="down" size={30} color="black" />
                    </View>
                </Pressable>
                </>}
            </View>
            <View style={styles.episodesContainer}>
                <View style={styles.episodesBlock}>
                {anime && anime.episodes && anime.episodes.map((item,index) => {
                    return <View key={index} style={styles.episode}>
                        <AntDesign style={{paddingRight: 5}} name="playcircleo" size={24} color="black" />
                        <Text style={{fontSize: 16}}>{item.episodeFull}</Text>
                    </View>
                })}
                </View>
            </View>
            <View style={styles.moreBlock}>
                <Pressable>
                    <View style={styles.moreItem}>
                        <Text style={styles.moreItemText}>Комментарии</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.moreItem}>
                        <Text style={styles.moreItemText}>Моменты</Text>
                    </View>
                </Pressable>
            </View>
            </>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#FFFFFF"
    },
    image: {
        width: "100%",
        aspectRatio: 4/3
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%', // gradient height from bottom
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        alignSelf: "center"
    },
    subTitle: {
        fontSize: 18,
        textAlign: "center",
        alignSelf: "center"
    },
    infoBlock: {
        fontSize: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    rating: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    ratingValue: {
        color: "green",
        fontSize: 16
    },
    studio: {
        color: "black",
        fontSize: 16,
        paddingHorizontal: 5,
    },
    episodesCount: {
        fontSize: 16,
        color: "black",
        paddingHorizontal: 5,
    },
    year: {
        fontSize: 16,
        color: "black",
        paddingHorizontal: 5
    },
    genresBlock: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%"
    },
    genre: {
        marginTop: 5,
        padding: 5,
        marginHorizontal: 2,
        backgroundColor: "#C9CDC8",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    watchButtonContainer: {
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    watchButton: {
        paddingVertical: 15,
        paddingHorizontal: 60,
        backgroundColor: "#777777",
        color: "#FFFFFF",
        borderRadius: 12
    },
    descriptionBlock: {
        position: "relative",
        marginTop: 10,
        width: "90%",
        alignSelf: "center",
        overflow: "hidden"
    },
    unlimitedHeight: {
        height: "auto"
    },
    limitedHeight: {
        height: 160
    },
    descriptionGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 10,
        height: '60%', // gradient height from bottom
    },
    downIcon: {
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        margin: "auto",
        bottom: 0,
    },
    episodesBlock: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "85%",
        justifyContent: "space-between"
    },
    episode: {
        width: "49%",
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C3C3C3",
        borderRadius: 12,
        paddingVertical: 5
    },
    episodesContainer: {
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    moreBlock: {
        marginTop: 20,
        width: "100%",
        borderColor: "black",
        borderStyle: "solid",
        borderTopWidth: 1
    },
    moreItem: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "black",
        borderStyle: "solid"
    },
    moreItemText: {
        fontSize: 18,
        paddingLeft: 5
    }

})


export default OneAnimePage;
