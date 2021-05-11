import React, { useState } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
function DialogueTextInput({ onDone, onDismiss, visible, ...otherProps }) {
  const [visibility, setVisibility] = useState(visible);
  console.log("WORKINGGGGGGGGGGG");
  return (
    <Provider>
      <View>
        <Portal>
          <Dialog
            visible={visibility}
            onDismiss={() => {
              {
                onDismiss();
              }
              setVisibility(false);
            }}
          >
            <Dialog.Title>
              Enter closing price and press Done to close the trade
            </Dialog.Title>
            <Dialog.Content>
              <TextInput {...otherProps} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  {
                    onDone();
                  }
                  setVisibility(false);
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

export default DialogueTextInput;
