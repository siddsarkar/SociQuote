import React, {useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import api from '../../api';
import Caraousel from '../../libs/Caraousel';

function HomeScreen() {
  const [data, setData] = useState([]);
  const [pageOffset, setPageOffset] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    async function fetchData() {
      const response = await api.airtable.getTable({
        table: 'quotes',
        params: {limit: 10, offset: pageOffset},
      });

      // console.log(JSON.stringify(response, null, 2));
      setPageOffset(response.offset);
      setData(response.records);
      setRefreshing(false);
    }
    fetchData();
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.airtable.getTable({
        table: 'quotes',
        params: {limit: 10},
      });
      // console.log(JSON.stringify(response, null, 2));
      setPageOffset(response.offset);
      setData(response.records);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{flex: 1}}
    >
      <Caraousel slideList={data} />
    </ScrollView>
  );
}

export default HomeScreen;
