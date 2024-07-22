import { toast } from '@backpackapp-io/react-native-toast';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useMutation, useQueryClient } from 'react-query';
import { login, useUSer } from "../apis/auth";
import { useToggle } from "../hooks/useToggle";
import { useAuthStore } from '../store';
import { colors } from "../Utils/colors";
import { fonts } from "../Utils/fonts";

  const LoginScreen = () => {
    const [isPasswordShown, setIsPasswordShown] = useToggle(true);
    const [active, setActive] = useToggle(false);
  const [activePassword, setActivePassword] = useToggle(false);
    // const [isChecked, setIsChecked] = useToggle(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    // const [secureEntery, setSecureEntery] = useState(true);
  
    const handleGoBack = () => {
      navigation.goBack();
    };
    const handleRegister = () => {
      navigation.navigate("SIGNUP");
    };

    const handleLogin = () => {
      if (
        !password.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/) ||
        !email.match(/^\S+@\S+\.\S+$/)
      ) {
        return;
      }
      mutate({email: email, password});
    }

    const { updateIsLogin, updateUser } = useAuthStore(state => state);
    const {refetch} = useUSer({
      onSuccess: data => {
        updateUser(data?.data);
        updateIsLogin(!!data);
      },
      onError: async () => {
        updateUser(undefined);
        updateIsLogin(false);
      },
      enabled: false,
    });

    const {mutate} = useMutation (login, {
      onSuccess: async data => {
        await SecureStore.setItemAsync('access_token', data.access_token);
        await SecureStore.setItemAsync('refresh_token', data.refresh_token);
        refetch();
        navigation.navigate('HOME');
      },
      onError: () => {
        toast.error('Email or password incorect', {
          duration: 3000,
          styles: {
            view: { backgroundColor: colors.background.default},
            text: {
              color: colors.error.main,
            },
          },
        });
      }
    });
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardAwareScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons
            name={"arrow-back-outline"}
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Hey,</Text>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.headingText}>Back</Text>
        </View>
        {/* form  */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              onFocus={setActive}
              onBlur={setActive}
              active={active}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              secureTextEntry={isPasswordShown}
              onBlur={setActivePassword}
              active={activePassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={setIsPasswordShown}>
                  <Ionicons
                    name={`eye${isPasswordShown ? '-off' : ''}`}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.continueText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Image
              source={require("../assets/google (1).png")}
              style={styles.googleImage}
            />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 25,
      paddingTop: 30
    },
    backButtonWrapper: {
      height: 40,
      width: 40,
      backgroundColor: colors.gray,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      marginVertical: 20,
    },
    headingText: {
      fontSize: 32,
      color: colors.primary,
      fontFamily: fonts.SemiBold,
    },
    formContainer: {
      marginTop: 20,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 100,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      padding: 2,
      marginVertical: 10,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 10,
      fontFamily: fonts.Light,
    },
    forgotPasswordText: {
      textAlign: "right",
      color: colors.primary,
      fontFamily: fonts.SemiBold,
      marginVertical: 10,
    },
    loginButtonWrapper: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginTop: 20,
    },
    loginText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: "center",
      padding: 10,
    },
    continueText: {
      textAlign: "center",
      marginVertical: 20,
      fontSize: 14,
      fontFamily: fonts.Regular,
      color: colors.primary,
    },
    googleButtonContainer: {
      flexDirection: "row",
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      gap: 10,
    },
    googleImage: {
      height: 20,
      width: 20,
    },
    googleText: {
      fontSize: 20,
      fontFamily: fonts.SemiBold,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      gap: 5,
    },
    accountText: {
      color: colors.primary,
      fontFamily: fonts.Regular,
    },
    signupText: {
      color: colors.primary,
      fontFamily: fonts.Bold,
    },
  });