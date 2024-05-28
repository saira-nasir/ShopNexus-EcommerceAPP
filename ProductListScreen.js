import React, { useEffect, useContext } from "react";
import { Pressable, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProductItem from "../components/ProductItem";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

const ProductListScreen = ({ navigation }) => {
  const { products, setProducts } = useContext(ProductContext);

  const fetchAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Products",
      headerLeft: () => (
        <Pressable
          onPress={goBack}
          style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}
        >
          <MaterialIcons name="chevron-left" size={34} color={"#111"} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleAlign: "center",
    });
    fetchAllProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {products?.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => navigation.navigate("DetailScreen", { product: product })}
            style={{ marginBottom: 20 }}
          >
            <ProductItem
              title={product?.title}
              image={product?.image}
              price={product?.price}
              brand={product?.brand}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductListScreen;
