import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    const ImageUploader = ({
      onImageSelect,
    }: {
      onImageSelect: (uri: string) => void;
    }) => {
      const [image, setImage] = useState<string | null>(null);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
          onImageSelect(result.assets[0].uri);
        }
      };

      const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
          onImageSelect(result.assets[0].uri);
        }
      };

      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Button title="Select from Gallery" onPress={pickImage} />
          <Button title="Open Camera" onPress={takePhoto} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      );
    };

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Select from Gallery" onPress={pickImage} />
      <Button title="Open Camera" onPress={takePhoto} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default ImageUploader;
