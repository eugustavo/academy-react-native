import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { Avatar } from "@components/Avatar";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <Avatar
        source={{ uri: 'https://www.github.com/eugustavo.png' }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá,</Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">Gustavo Souza</Heading>
      </VStack>


      <TouchableOpacity>
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