import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import LogoSvg from "../assets/logo.svg";
import styles from "../styles/components/Header.styles";
import UserPhoto from "./UserPhoto";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <UserPhoto />
      </View>
    </View>
  );
};

export default Header;
