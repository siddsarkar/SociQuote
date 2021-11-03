import React, {useEffect, useState} from 'react'
import ContentLoader, {Rect} from 'react-content-loader/native'
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import api from '../../api'
import {Caraousel} from '../../components/common'

const QuoteSkeletonLoader = props => (
  <ContentLoader
    speed={0.8}
    width={300}
    height={42}
    viewBox="0 0 300 22"
    backgroundColor="#f3f3f3"
    foregroundColor="#000"
    {...props}
  >
    <Rect x="0" y="10" rx="0" ry="0" width="300" height="6" />
    <Rect x={(400 - 178) / 3} y="26" rx="0" ry="0" width="178" height="6" />
  </ContentLoader>
)

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setIsError(false)
    setRefreshing(true)
    setIsLoading(true)
    async function fetchData() {
      try {
        const response = await api.quotable.getQuotes({
          limit: 10,
          page,
        })

        setPage(response.page + 1)
        setData(response.results)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
        setIsError(true)
      }

      if (isError) {
        setTimeout(() => setIsLoading(false), 2000)
      } else {
        setIsLoading(false)
      }
    }

    fetchData()
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.quotable.getQuotes({limit: 10})
        setPage(response.page + 1)
        setData(response.results)

        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsError(true)
        setTimeout(() => setIsLoading(false), 2000)
      }
    }
    setIsLoading(true)
    fetchData()
  }, [])

  const backgroundStyle = {flex: 1}
  const textStyle = {
    fontSize: 35,
    color: 'white',
  }

  return isLoading ? (
    <View>
      <Text style={[textStyle, {textAlign: 'center'}]}>〃</Text>
      <QuoteSkeletonLoader />
    </View>
  ) : isError ? (
    <View>
      <Text style={textStyle}>:(</Text>
      <Text style={[textStyle, {marginVertical: 8}]}>Couldn't connect</Text>
      <TouchableOpacity
        onPress={onRefresh}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#fafafb',
          borderRadius: 16,
          height: 32,
          width: '100%',
          marginTop: 8,
          justifyContent: 'center',
        }}
      >
        <Text style={{textAlign: 'center', paddingHorizontal: 32}}>retry</Text>
      </TouchableOpacity>
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
  )
}

export default HomeScreen
