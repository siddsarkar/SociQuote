import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import api from '../../api';
import {Caraousel} from '../../components/common';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    async function fetchData() {
      const response = await api.quotable.getQuotes({
        limit: 10,
        page,
      });

      setPage(response.page + 1);
      setData(response.results);
      setRefreshing(false);
    }

    fetchData();
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.quotable.getQuotes({limit: 10});
      setPage(response.page + 1);
      setData(response.results);

      setIsLoading(false);
    }

    fetchData();
  }, []);

  const backgroundStyle = {flex: 1};
  const textStyle = {color: '#fff', marginTop: 8};

  return isLoading ? (
    <View>
      <ActivityIndicator color="#fff" size="large" />
      <Text style={textStyle}>Loading...</Text>
    </View>
  ) : (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={backgroundStyle}
    >
      <Caraousel slideList={data} />
    </ScrollView>
  );
};

export default HomeScreen;
