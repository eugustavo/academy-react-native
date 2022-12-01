import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Form/Input';
import { Button } from '@components/Button';

import { Controller, useForm } from 'react-hook-form';
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const toast = useToast();
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleNewAccount() {
    navigation.navigate('SignUp');
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn({ email, password });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel fazer login. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center mt={12}>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType='send'
              />
            )}
          />

          <Button
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text
            mb={3}
            color="gray.100"
            fontSize="sm"
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button title='Criar conta' variant="outline" onPress={handleNewAccount} />
        </Center>
      </VStack>
    </ScrollView>
  );
}