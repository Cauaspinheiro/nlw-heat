import React from "react";
import { Image, View } from "react-native";
import styles from "../styles/components/UserPhoto.styles";

import AvatarImage from "../assets/avatar.png";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme";

const SIZES = {
  small: {
    containerSize: 32,
    avatarSize: 28,
  },
  normal: {
    containerSize: 48,
    avatarSize: 42,
  },
};

const AVATAR_DEFAULT = Image.resolveAssetSource(AvatarImage).uri;

export interface UserPhotoProps {
  size?: "small" | "normal";
  avatarUrl?: string;
}

const UserPhoto: React.FC<UserPhotoProps> = ({
  avatarUrl,
  size = "normal",
}) => {
  const { avatarSize, containerSize } = SIZES[size];

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.8, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
    >
      <Image
        source={{
          uri: avatarUrl || AVATAR_DEFAULT,
        }}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      />
    </LinearGradient>
  );
};

export default UserPhoto;
