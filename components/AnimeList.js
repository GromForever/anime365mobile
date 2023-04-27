import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import AnimeCard from "./AnimeCard";
import {FetchAnimeAsync} from "../api/series";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll";
import LoadingComponent from "./LoadingComponent";
import {useNavigation} from "@react-navigation/native";

const AnimeList = () => {
    let [anime, setAnime] = useState([]);
    let [page, setPage] = useState(0);
    const navigation = useNavigation();


    const UpdateAnimeState = async () => {
        setPage(page + 1)
        let animeList = await FetchAnimeAsync(page, 10);
        setAnime([...anime, ...animeList])
    }


    const [loading, endReachedInvoke] = useInfiniteScroll(UpdateAnimeState)
    useEffect(() => {
        UpdateAnimeState();
    }, [])
    return (
        <View style={{height: "100%"}}>
            <View style={{flex: 1}}>
                {anime.length > 0 && <FlatList
                    style={{maxHeight: "99%"}}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={<View style={{height: 5}}></View>}
                    onEndReached={() => {
                        endReachedInvoke(true)
                    }}
                    numColumns={2}
                    data={anime}
                    renderItem={({item}) =>
                            <View style={ContainerStyles.container}>
                                <TouchableOpacity onPress={() => navigation.navigate("OneAnime", {id: item.id, title: item.titles.ru})}>
                                    <AnimeCard animeInfo={item}/>
                                </TouchableOpacity>
                            </View>
                        }
                    contentContainerStyle={{paddingBottom: 50}}
                ></FlatList>}
                {loading && <LoadingComponent/>}
            </View>
        </View>
    );
};

const ContainerStyles = StyleSheet.create({container: {
        width: "50%",
        display: "flex",
    }})

export default AnimeList;
