import {FlatList, StyleSheet, View, Dimensions, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useFetchAnimeByQuery from "../hooks/useFetchAnimeByQuery";
import {useCallback, useState} from "react";
import Separator from "./Separator";
import AnimeCard from "./AnimeCard";
import AnimeListHeader from "./AnimeListHeader";
import LoadingError from "./LoadingError";
import LoadingComponent from "./LoadingComponent";


let debounceTimeout;
const AnimeList = (callback, deps) => {
    const navigation = useNavigation();
    const [anime, isLoading, setQuery, onEndReached, onRefresh, isRefreshing, error] = useFetchAnimeByQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const InputChangedHandler = (value) => {
        const searchText = value;
        setSearchTerm(searchText);

        debounce(() => {
            setQuery(searchText)
        }, 500)();
    }

    const renderItem = useCallback(({item}) => {
        return (
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("OneAnime", {id: item.id, title: item.titles.ru}, )}>
                    <View style={Styles.container}>
                    <AnimeCard animeInfo={item}/>
                        </View>
                </TouchableOpacity>)
    }, [])

    function debounce(func, delay) {
        return function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, arguments), delay);
        };
    }

    return (
        <View>
            {isLoading ? <LoadingComponent/> :
            error ? <LoadingError RefreshFunc={onRefresh}></LoadingError> :
                <FlatList
                    ListHeaderComponent={<AnimeListHeader onChange={InputChangedHandler} searchValue={searchTerm}/>}
                    style={Styles.margin}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={anime}
                    ItemSeparatorComponent={Separator}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.25}
                    renderItem={renderItem}/>
            }

        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 2
    },
    margin: {
        marginTop: 20
    }
})


export default AnimeList;
