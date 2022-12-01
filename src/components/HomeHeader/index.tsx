import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Heading, HStack, Text, VStack, Icon } from "native-base";

import { useAuth } from "@hooks/useAuth";

import { Avatar } from "@components/Avatar";

import defaultAvatar from '@assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <Avatar
        source={user.avatar ? { uri: user.avatar } : defaultAvatar}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá,</Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">{user.name}</Heading>
      </VStack>


      <TouchableOpacity onPress={signOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}