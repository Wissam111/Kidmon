import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import DefaultButton from "./DefaultButton";
const ChargeBalanceModal = ({ setShowDialog, visible, chargeBalance }) => {
  const handlePress = () => {
    Keyboard.dismiss();
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
  };

  const handleChargeBalance = () => {
    setInputValue("");
    setShowDialog(false);
    chargeBalance(inputValue);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setShowDialog(false)}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  position: "relative",
                  width: "100%",

                  // justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name="balance-scale-left"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontSize: 15 }}>
                  {"Charge Balance"}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDialog(false)}
                  style={{ position: "absolute", right: 10, top: 8 }}
                >
                  <Ionicons
                    name="ios-close-circle-outline"
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                // label="Add points"
                style={styles.input}
                value={inputValue}
                keyboardType="numeric"
                onChangeText={handleInputChange}
              />
              <DefaultButton
                onPress={handleChargeBalance}
                text={"Charge"}
                style={{ width: 200, height: 50, margonTop: "auto" }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default ChargeBalanceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    // height: "50%",
    zIndex: 99999,
    flex: 1,
  },
  modalHeader: {
    backgroundColor: "#5FD5E5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // ...theme.SHADOW.shadowComponent2,
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    height: 300,
    borderRadius: 10,
  },
  langBtn: {
    width: 180,
    height: 45,
    // ...theme.SHADOW.shadowComponent,
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "90%",
    margin: 16,
    fontSize: 20,
    height: 45,
    borderWidth: 2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 50,
    paddingLeft: 10,
  },
});
