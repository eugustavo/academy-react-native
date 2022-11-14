import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group/inde";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas');
  const [groups, setGroups] = useState(['costas', 'ombros', 'pernas', 'biceps', 'triceps', 'peito', 'abdomen', 'cardio']);
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Curvada', 'Remada Unilateral', 'Levantamento Terra']);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('Exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 5 }}
        mt={4}
        mb={10}
        maxH={10}
        renderItem={({ item }) => (
          <Group 
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      
      <VStack flex={1} px={5}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={handleOpenExerciseDetails}
            />
          )}
        />
      </VStack>
    </VStack>
  )
}