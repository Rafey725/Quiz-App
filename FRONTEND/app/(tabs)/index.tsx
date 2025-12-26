import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { tabBarColor, textPrimary, textSecondary } from '@/constants/colors'
import { useFonts, Kufam_400Regular, Kufam_700Bold } from '@expo-google-fonts/kufam';
import { Shadow } from 'react-native-shadow-2'
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '@/Redux/categorySlice';
import { setQuestionNumZero } from '@/Redux/questionNumSlice'
import { newAttempt } from '@/Redux/quizAttemptSlice';
import { resetScore } from '@/Redux/scoreSlice';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/config/api';
import * as SecureStore from 'expo-secure-store'
import { setToken } from '@/Redux/tokenSlice';
import { setUserInfo } from '@/Redux/userInfoSlice';
import { LoginFormPreview } from '@/components/LoginFormPreview';
import { setAuthStateFalse } from '@/Redux/authStateSlice';
import { turnOnLoading } from '@/Redux/loadingSlice';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  // Applying Kufam font... 
  const [fontsLoaded] = useFonts({
    Kufam_400Regular,
    Kufam_700Bold,
  });
  // @ts-ignore
  const defaultTextFont = Text.render;

  // @ts-ignore
  Text.render = function (...args) {
    const origin = defaultTextFont.apply(this, args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: 'Kufam_400Regular' }, origin.props.style]
    });
  };

  let router = useRouter()
  let disptach = useDispatch()

  const [inputValue, setInputValue] = useState('')
  function handleTextChange(text: any) {
    setInputValue(text)
  }

  let categories = [
    { name: 'HTML', image: require('@/assets/categories/HTML.png') },
    { name: 'JavaScript', image: require('@/assets/categories/JavaScript.png') },
    { name: 'React', image: require('@/assets/categories/React.png') },
    { name: 'C++', image: require('@/assets/categories/C++.png') },
    { name: 'Python', image: require('@/assets/categories/Python.png') },
  ]

  let recentActivity = [
    {
      name: 'html',
      image: require('@/assets/categories/HTML.png'),
      totalQuestions: 30,
      attemptedQuestions: 20,
      color: '#F82929',
      bgcolor: '#FDE4E4'
    },
    {
      name: 'JavaScript',
      image: require('@/assets/categories/JavaScript.png'),
      totalQuestions: 30,
      attemptedQuestions: 20,
      color: '#DAB92C',
      bgcolor: '#FEF8DC'
    },
    {
      name: 'React',
      image: require('@/assets/categories/React.png'),
      totalQuestions: 30,
      attemptedQuestions: 20,
      color: '#04D7FD',
      bgcolor: '#DBF9FF'
    },
    {
      name: 'C++',
      image: require('@/assets/categories/C++.png'),
      totalQuestions: 30,
      attemptedQuestions: 20,
      color: '#034E85',
      bgcolor: '#D9ECFF'
    },
    {
      name: 'Python',
      image: require('@/assets/categories/Python.png'),
      totalQuestions: 30,
      attemptedQuestions: 20,
      color: '#8F04FD',
      bgcolor: '#F1DFFF'
    },
  ]

  const dispatch = useDispatch()
  const userInfo = useSelector((state: any) => state.userInfoState.userInfo)
  const token = useSelector((state: any) => state.tokenState.token)
  const authState = useSelector((state: any) => state.authState.authState)
  const [loginPreview, setLoginPreview] = useState(false)

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const token = await SecureStore.getItemAsync('token')
  //       disptach(setToken(token))
  //     } catch (err) {
  //       console.log('Loading the token, Error: ', err)
  //     }
  //   })()
  // }, [authState])

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        try {
          const token = await SecureStore.getItemAsync('token')
          if (isActive) disptach(setToken(token))
        } catch (err) {
          console.log('Loading the token, Error: ', err)
        }
      })();

      return () => isActive = false
    }, [dispatch])
  )

  // Fetching user data
  const { data, isPending } = useQuery({
    queryKey: ['userInfoData', token],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      dispatch(setUserInfo(data))
      return data
    },
    enabled: !!token
  })

  // handle click on cateory
  const handleCategoryClick = (category: any) => {
    if (!!userInfo?.username) {
      disptach(changeCategory(category.name.toLocaleLowerCase()))
      disptach(setQuestionNumZero())
      disptach(newAttempt())
      disptach(resetScore())
      router.push('/questions')
    } else {
      dispatch(turnOnLoading())
      router.replace('/(auth)')
    }
  }

  return (
    <ScrollView style={styles.main}>
      {/* Profile header */}
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ display: 'flex', columnGap: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('@/assets/profile-avatar.png')} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View>
            <Text style={[styles.text_Kufam_Reg, { color: textPrimary, fontSize: 20, opacity: 0.8 }]}>{userInfo.username ? userInfo.username : 'Aamir'}</Text>
            <Text style={[styles.text_Kufam_Reg, { color: textSecondary }]}>ID-{userInfo.id ? userInfo.id : '1809'}</Text>
          </View>
        </View>
        <Image source={require('@/assets/diamond-image.png')} style={{ width: 65, height: 27, }} />
      </View>

      {/* Hero banner */}
      <View style={[styles.justify_items_center, { paddingVertical: 10 }]}>
        <Image source={require('@/assets/hero-image.png')} resizeMode='cover' style={{ width: '100%', height: 139, borderRadius: 7, marginVertical: 10 }} />
      </View>

      {/* Search bar container */}
      <View style={[styles.justify_between, { columnGap: 20 }]}>
        {/* Search bar */}
        <View style={[styles.items_center, styles.justify_between, { width: 'auto', flex: 1, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: tabBarColor, borderRadius: 7 }]}>
          <TextInput
            style={{ color: '#E8E8E8' }}
            placeholder='Search'
            placeholderTextColor='#e8e8e898'
            value={inputValue}
            onChangeText={handleTextChange}
          />
          <Image source={require('@/assets/search-icon.png')} style={{ width: 20, height: 20 }} />
        </View>
        {/* Options icon */}
        <View style={[styles.justify_items_center, { backgroundColor: tabBarColor, borderRadius: 7, width: 42, height: 'auto' }]}>
          <Image source={require('@/assets/options-icon.png')} resizeMode='cover' style={{ width: 40, height: 40 }} />
        </View>
      </View>

      {/* Categories */}
      <View style={{ paddingVertical: 10, paddingHorizontal: 2 }}>
        <Text style={[styles.text_Kufam_Reg, styles.text_primary, { fontSize: 14, height: 20 }]}>Categories</Text>
        <View style={[styles.items_center, styles.justify_between]}>
          {categories.map((category, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleCategoryClick(category)}
                style={[styles.items_center, { flexDirection: 'column' }]}>
                <View style={[styles.justify_items_center, { backgroundColor: tabBarColor, width: 60, height: 42, marginVertical: 10, borderRadius: 5 }]}>
                  <Image source={category.image} />
                </View>
                <Text style={[styles.text_Kufam_Reg, styles.text_secondary, { fontSize: 10, wordWrap: 'nowrap' }]}>{category.name.toLocaleUpperCase()}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[{ marginBottom: 50 }]}>
        <Text style={[styles.text_Kufam_Reg, styles.text_primary, { fontSize: 14, height: 20 }]}>Recent Activity</Text>
        <View style={[styles.flex, { gap: 20, paddingVertical: 20 }]}>
          {recentActivity.map((activity, idx) => {
            return (
              <Shadow key={idx}
                distance={8}
                startColor="rgba(255, 255, 255, 0.10)"   // subtle white glow
                endColor="rgba(255, 255, 255, 0)"       // smooth fade
                offset={[0, 4]}
                paintInside={false}
              >
                <View key={idx} style={[styles.justify_between, styles.items_center, { width: '100%', paddingTop: 6, paddingHorizontal: 20, borderRadius: 4, }]}>
                  {/* Activity name */}
                  <View style={[styles.justify_items_center, { columnGap: 10 }]}>
                    <View style={[styles.justify_items_center, { backgroundColor: tabBarColor, width: 60, height: 42, borderRadius: 5 }]}>
                      <Image source={activity.image} />
                    </View>
                    <View style={[{}]}>
                      <Text style={[styles.text_Kufam_Reg, { color: textPrimary, height: 18, marginTop: 6, fontSize: 13 }]}>{activity.name}</Text>
                      <Text style={[styles.text_Kufam_Reg, { color: textSecondary, marginTop: 0, fontSize: 10 }]}>{activity.totalQuestions} Questions</Text>
                    </View>
                  </View>

                  {/* Activity percentage */}
                  <View style={[styles.justify_items_center, { backgroundColor: activity.bgcolor, height: 45, width: 45, borderWidth: 2.5, borderColor: activity.color, borderRadius: 50 }]}>
                    <Text style={[styles.text_Kufam_Reg, { color: 'black', height: 14, fontSize: 10 }]}>{activity.attemptedQuestions}/{activity.totalQuestions}</Text>
                  </View>
                </View>
              </Shadow>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: '#050816',
  },
  flex: { display: 'flex' },
  justify_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },
  justify_between: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  items_center: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  justify_items_center: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  text_primary: { color: textPrimary },
  text_secondary: { color: textSecondary },
  text_Kufam_Reg: { height: 30, fontFamily: 'Kufam_400Regular' }
})