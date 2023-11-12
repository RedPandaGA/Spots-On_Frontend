// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from "../components/colors";
// import { Ionicons } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox";
// import Button from "../components/button";

// const Login = ({ navigation }) => {
//   const [isPasswordShown, setIsPasswordShown] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#2C6765" }}>
//       <View style={{ flex: 1, marginHorizontal: 22 }}>
//         <View style={{ marginVertical: 22 }}>
//           <Text
//             style={{
//               fontSize: 22,
//               fontWeight: "bold",
//               marginVertical: 12,
//               color: COLORS.white,
//             }}
//           >
//             Hi, Welcome Back! 👋
//           </Text>

//           <Text
//             style={{
//               fontSize: 16,
//               color: COLORS.white,
//             }}
//           >
//             Hello again you have been missed!
//           </Text>
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: 400,
//               marginVertical: 8,
//               color: "white",
//             }}
//           >
//             Email address
//           </Text>

//           <View
//             style={{
//               width: "100%",
//               height: 48,
//               borderColor: COLORS.white,
//               backgroundColor: "#2C6765",
//               borderWidth: 1,
//               borderRadius: 8,
//               alignItems: "center",
//               justifyContent: "center",
//               paddingLeft: 22,
//             }}
//           >
//             <TextInput
//               placeholder="Enter your email address"
//               placeholderTextColor={COLORS.black}
//               keyboardType="email-address"
//               style={{
//                 width: "100%",
//               }}
//             />
//           </View>
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: 400,
//               marginVertical: 8,
//               color: "white",
//             }}
//           >
//             Password
//           </Text>

//           <View
//             style={{
//               width: "100%",
//               height: 48,
//               borderColor: COLORS.white,
//               backgroundColor: "#2C6765",
//               borderWidth: 1,
//               borderRadius: 8,
//               alignItems: "center",
//               justifyContent: "center",
//               paddingLeft: 22,
//             }}
//           >
//             <TextInput
//               placeholder="Enter your password"
//               placeholderTextColor={COLORS.black}
//               secureTextEntry={isPasswordShown}
//               style={{
//                 width: "100%",
//               }}
//             />

//             <TouchableOpacity
//               onPress={() => setIsPasswordShown(!isPasswordShown)}
//               style={{
//                 position: "absolute",
//                 right: 12,
//               }}
//             >
//               {isPasswordShown == true ? (
//                 <Ionicons name="eye-off" size={24} color={COLORS.black} />
//               ) : (
//                 <Ionicons name="eye" size={24} color={COLORS.black} />
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             marginVertical: 6,
//           }}
//         >
//           <Checkbox
//             style={{ marginRight: 8 }}
//             value={isChecked}
//             onValueChange={setIsChecked}
//             color={isChecked ? COLORS.white : undefined}
//           />

//           <Text style={{ color: "white" }}>Remember Me</Text>
//         </View>

//         <Button
//           title="Login"
//           style={{
//             marginTop: 18,
//             marginBottom: 4,
//             backgroundColor: "#2C6765",
//             borderColor: "white",
//           }}
//           onPress={() => navigation.navigate("Home")}
//         />

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginVertical: 20,
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               height: 1,
//               backgroundColor: COLORS.grey,
//               marginHorizontal: 10,
//             }}
//           />
//           <Text style={{ fontSize: 14, color: "white" }}>Or Login with</Text>
//           <View
//             style={{
//               flex: 1,
//               height: 1,
//               backgroundColor: COLORS.grey,
//               marginHorizontal: 10,
//             }}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => console.log("Pressed")}
//             style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               flexDirection: "row",
//               height: 52,
//               borderWidth: 1,
//               borderColor: COLORS.white,
//               backgroundColor: '#2C6765',
//               marginRight: 4,
//               borderRadius: 10,
//             }}
//           >
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => console.log("Pressed")}
//             style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               flexDirection: "row",
//               height: 52,
//               borderWidth: 1,
//               borderColor: COLORS.white,
//               backgroundColor: '#2C6765',
//               marginRight: 4,
//               borderRadius: 10,
//             }}
//           >
//             </TouchableOpacity>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             marginVertical: 22,
//           }}
//         >
//           <Text style={{ fontSize: 16, color: COLORS.white }}>
//             Don't have an account?
//           </Text>
//           <Pressable onPress={() => navigation.navigate("Signup")}>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: COLORS.white,
//                 fontWeight: "bold",
//                 marginLeft: 6,
//               }}
//             >
//               Register
//             </Text>
//           </Pressable>
//         </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Login;
