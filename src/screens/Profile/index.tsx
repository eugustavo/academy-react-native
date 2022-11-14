import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { Avatar } from "@components/Avatar";
import { Input } from '@components/Form/Input';
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

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
              source={{ uri: 'https://github.com/eugustavo.png'}}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          
          <TouchableOpacity>
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