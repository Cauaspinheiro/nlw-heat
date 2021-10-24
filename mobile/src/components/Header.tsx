import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import LogoSvg from "../assets/logo.svg";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../styles/components/Header.styles";
import UserPhoto from "./UserPhoto";

const Header: React.FC = () => {
  const { user, signOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <LogoSvg />

      {user && (
        <View style={styles.logoutButton}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>

          <UserPhoto avatarUrl={user.avatar_url} />
        </View>
      )}
    </View>
  );
};

export default Header;
