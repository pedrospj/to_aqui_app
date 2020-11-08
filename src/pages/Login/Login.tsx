import React, { useState } from 'react';
import styles from './styles';
import Container from '../../components/Container/Container';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Formik } from 'formik';
const toAquiLogo = require('../../assets/images/to_aqui.png');
import * as yup from 'yup';
import {
  Input,
  Button,
  Spinner,
  Icon,
  Card,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../services/userService';

const formSchema = yup.object().shape({
  email: yup.string().email().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
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
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const initialValues: FormikValues = {
    email: 'p.pedrospj@gmail.com',
    password: '',
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry((s) => !s)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleSubmit = async (values: FormikValues) => {
    try {
      setDataState(states.loading);
      await login(values.email, values.password);
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
                  value={formik.values.password}
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={formik.handleChange('password')}
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
                size="small"
                style={styles.createAccount}>
                Criar conta
              </Button>
            </View>
          )}
        </Formik>

        <Modal
          visible={dataState === states.error}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setDataState(states.idle)}>
          <Card disabled={true}>
            <Text style={styles.modalText}>E-mail ou senha incorretos</Text>
            <Button
              size="tiny"
              status="danger"
              style={styles.modalButton}
              onPress={() => setDataState(states.idle)}>
              Fechar
            </Button>
          </Card>
        </Modal>
      </ScrollView>
    </Container>
  );
};

export default Login;
