import React, { useState } from 'react';
import styles from './styles';
import Container from '../../components/Container/Container';
import { View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Formik } from 'formik';
const toAquiLogo = require('../../assets/images/to_aqui.png');
import * as yup from 'yup';
import { Input, Button, Spinner, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const formSchema = yup.object().shape({
  email: yup.string().email().required('Campo obrigatório'),
});

interface FormikValues {
  email: string;
  password: string;
}

const states = {
  idle: 'IDLE',
  loading: 'LOADING',
  error: 'ERROR',
};

const LoadingIcon = () => (
  <View>
    <Spinner size="small" status="basic" />
  </View>
);

const Login = () => {
  const [dataState, setDataState] = useState(states.idle);
  const navigation = useNavigation();

  const initialValues: FormikValues = {
    email: 'p.pedrospj@gmail.com',
    password: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      setDataState(states.loading);
      setDataState(states.idle);
    } catch (error) {
      setDataState(states.error);
      console.log(error);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logo}
          source={toAquiLogo}
        />
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={formSchema}>
          {(formik) => (
            <View>
              <View style={styles.fieldContainer}>
                <Input
                  label={'E-mail:'}
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  size="large"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Input
                  label={'Senha:'}
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                />
              </View>

              <Button
                onPress={formik.handleSubmit}
                accessoryLeft={
                  dataState === states.loading ? LoadingIcon : undefined
                }
                style={styles.login}>
                Login
              </Button>

              <Button
                onPress={handleCreateAccount}
                appearance="outline"
                style={styles.createAccount}>
                Criar conta
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default Login;
