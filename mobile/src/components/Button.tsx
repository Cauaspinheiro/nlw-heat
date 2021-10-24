import { AntDesign } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { ActivityIndicator, ColorValue, Text } from "react-native";
import {
  BorderlessButton,
  BorderlessButtonProps,
} from "react-native-gesture-handler";
import styles from "../styles/components/Button.styles";

export interface ButtonProps extends BorderlessButtonProps {
  children: React.ReactText;
  style: {
    color: ColorValue;
    backgroundColor: ColorValue;
  };
  icon?: React.ComponentProps<typeof AntDesign>["name"];
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = (props) => {
  const isLoading = props.isLoading ?? false;

  return (
    <BorderlessButton
      {...props}
      style={[
        styles.container,
        { backgroundColor: props.style.backgroundColor },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={props.style.color} size={24} />
      ) : (
        <Fragment>
          {props.icon && (
            <AntDesign name={props.icon} size={24} style={styles.icon} />
          )}

          <Text style={[styles.title, { color: props.style.color }]}>
            {props.children}
          </Text>
        </Fragment>
      )}
    </BorderlessButton>
  );
};

export default Button;
