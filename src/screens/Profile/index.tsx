import { useState } from "react";
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { Avatar } from "@components/Avatar";
import { Input } from '@components/Form/Input';
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [userPhoto, setUserPhoto] = useState('https://github.com/eugustavo.png');
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if (photoSelected.cancelled) {
        return
      }

      if (photoSelected.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Ops, imagem muito grande...',
            description: 'Essa imagem é muito grande. Selecione uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setUserPhoto(photoSelected.uri);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={5}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ):(
            <Avatar
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder='Nome'
          />

          <Input
            bg="gray.600"
            placeholder="E-mail"
            isDisabled
          />
        </Center>

        <VStack px={5} mt={6} mb={9}>
          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mb={2}
          >
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder='Nova senha'
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder='Confirme a nova senha'
            secureTextEntry
          />

          <Button title="Atualizar" mt={2} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}