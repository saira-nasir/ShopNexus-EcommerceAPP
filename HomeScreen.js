



import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Pressable, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserLogo from '../../assets/user.png';
import OfferCard from '../components/OfferCard';
import NewArrivalsCard from '../components/NewArrivalsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthenticationModal from '../components/AuthenticationModal';
import AuthContext from '../features/authContext';
import ProductContext from '../features/productContext';
import { getProducts } from '../features/firebase/product';


const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);


  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchAllProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#588157' }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginTop: 30 }}>
          <View style={{ backgroundColor: '#344e41', borderRadius: 35, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="menu" size={34} color="#fff" />
          </View>
        </View>

        {!isLoggedIn && (
  <View style={{ position: 'absolute', top: 0, right: 0, margin: 10 }}>
    <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderWidth: 1, borderColor: 'black', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15 }}>
      <Image source={UserLogo} style={{ height: 40, width: 40, backgroundColor: '#aaaaaa', borderRadius: 50 }} />
      <Text style={{ fontWeight:'bold', paddingLeft: 5, color: '#000000' }}>Login</Text>
    </Pressable>
  </View>
)}


        <View style={{ backgroundColor: '#a3b18a', padding: 20, borderRadius: 10, marginVertical: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>Welcome, <Text style={{ fontWeight: 'bold', color: 'black' }}>{currentUser?.name}</Text></Text>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#344e41', textAlign: 'center' }}>TO</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#800000' }}>
              SHOPNEXUS
              </Text>
</View>

        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 30, alignItems: 'center', paddingVertical: 10 }}>
          <MaterialIcons name="search" size={24} color="#111" style={{ marginLeft: 10, marginRight: 5 }} />
          <TextInput placeholder="Browse any category" placeholderTextColor="#344e41" style={{ flex: 1,fontWeight:'bold', fontSize: 20 }} />
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <OfferCard />
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>New Arrivals</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text style={{  fontWeight: 'bold',color: '#283618' }}>View All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products?.map(product => (
              <Pressable key={product.id} onPress={() => navigation.navigate("detailscreen", { productId: product.id })}>
                <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Tech Gadgets</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text style={{ fontWeight: 'bold',color: '#283618' }}>View All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products?.map(product => (
              <Pressable key={product.id} onPress={() => navigation.navigate("detailscreen", { productId: product.id })}>
                <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <AuthenticationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;


