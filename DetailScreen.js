import { Text, View, Pressable, Image, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/cartContext";

const DetailScreen = ({ navigation, route }) => {
  const { currentProduct: product, setCurrentProduct } = useContext(ProductContext);
  const { setCartItems } = useContext(CartContext);
  const id = route.params.productId;

  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty(prev => prev + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const addItemToCart = async () => {
    const res = await addToCart(id, qty);
    if (res.success === true) {
      ToastAndroid.show("Item added to cart", ToastAndroid.BOTTOM);
      setCartItems(res.data);
    }
  };

  const fetchProductById = async (id) => {
    const result = await getProductById(id);
    setCurrentProduct(result);
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ backgroundColor: '#000000', width: '100%' }}>
            <Pressable onPress={goBack} style={{ marginTop: 20, position: 'absolute', zIndex: 10, top: 4, justifyContent: 'center', alignItems: 'center', height: 40, width: 40, marginHorizontal: 4, borderRadius: 20, backgroundColor: '#000000' }}>
              <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
            </Pressable>
            <Image source={{ uri: product?.image }} style={{ resizeMode: "cover", height: 470 }} />
          </View>

          <View style={{ borderRadius: 30, backgroundColor: '#F4F4F4', marginTop: -20, padding: 20 }}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{product?.title}</Text>
                  <Text style={{ fontSize: 14, color: '#666666', marginBottom: 10 }}>{product?.brand}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#E0E0E0', borderRadius: 5 }} onPress={decrement}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>-</Text>
                  </Pressable>
                  <Text style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 5, borderColor: '#CCCCCC', borderWidth: 1 }}>{qty}</Text>
                  <Pressable style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#E0E0E0', borderRadius: 5 }} onPress={increment}>
                    <Text style={{ fontSize: 20 }}>+</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Description</Text>
                <Text style={{ color: '#666666' }}>{product?.description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#666666', marginBottom: 5 }}>Total Price</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>${product?.price}</Text>
        </View>
        <Pressable onPress={addItemToCart} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30 }}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
