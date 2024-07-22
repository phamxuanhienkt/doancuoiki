import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../Utils/colors";
import { fonts } from "../Utils/fonts";
import { register } from "../apis/auth";
  
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useMutation } from 'react-query';
  
  const SignupScreen = () => {
    const [secureEntery, setSecureEntery] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(true);
    const [active, setActive] = useState(false);
    const [activeConfirmPassword, setActiveConfirmPassword] = useState(false);
    const [activePassword, setActivePassword] = useState(false);
    const navigation = useNavigation();

    const { mutate } = useMutation(register, {
      onSuccess: () => navigation.navigate('LOGIN'),
    });

    const handleGoBack = () => {
      navigation.goBack();
    };

    const handleRegister = () => {
      if (
        !password.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/) ||
        !email.match(/^\S+@\S+\.\S+$/) ||
        passwordConfirm !== password
      ) {
        return;
      }
      mutate({ fullname: email, email: email.toLowerCase(), password });
    };
  
    const handleLogin = () => {
      navigation.navigate("LOGIN");
    };
  
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
          <Text style={styles.headingText}>Let's get</Text>
          <Text style={styles.headingText}>started</Text>
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
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              active={active}
              value={email}
              onChangeText={setEmail}
              error={
                email.match(/^\S+@\S+\.\S+$/) ? '' : email && 'Email invalid'
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              secureTextEntry={isPasswordShown}
              onFocus={() => setActivePassword(true)}
              onBlur={() => setActivePassword(false)}
              active={activePassword}
              value={password}
              onChangeText={setPassword}
              error={
                password.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/)
                  ? ''
                  : password && 'Password minimum 8 characters'
              }
            />
            
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              <Ionicons name={`eye${isPasswordShown ? '-off' : ''}`}
                    size={18}
                    color={colors.primary} />
            </TouchableOpacity>
            
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm your password"
              placeholderTextColor={colors.secondary}
              secureTextEntry={isConfirmPasswordShown}
              onFocus={() => setActiveConfirmPassword(true)}
              onBlur={() => setActiveConfirmPassword(false)}
              active={activeConfirmPassword}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              error={
                !passwordConfirm.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/) &&
                passwordConfirm
                  ? 'Password minimum 8 characters'
                  : passwordConfirm && passwordConfirm !== password
                  ? 'Password confirm does not match'
                  : ''
              }
            />
            <TouchableOpacity
              onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
            >
              <Ionicons name={`eye${isConfirmPasswordShown ? '-off' : ''}`}
                    size={18}
                    color={colors.primary} />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleRegister}>
            <Text style={styles.loginText}>Sign up</Text>
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
            <Text style={styles.accountText}>Already have an account!</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
  };
  
  export default SignupScreen;
  
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