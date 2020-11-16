import React, { useState } from 'react';
import styles from './styles';
import Container from '../../components/Container/Container';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
const toAquiLogo = require('../../assets/images/to_aqui.png');
import {
  Input,
  Button,
  Spinner,
  Icon,
  Card,
  Modal,
  Text,
} from '@ui-kitten/components';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import { createUser } from '../../services/userService';

const formSchema = yup.object().shape({
  email: yup.string().email().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup.string().required('Campo obrigatório'),
});

interface FormikValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
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

const Signup = () => {
  const [dataState, setDataState] = useState(states.idle);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const initialValues: FormikValues = {
    email: 'p.pedrospj@gmail.com',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry((s) => !s)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleSubmit = async (
    values: FormikValues,
    formikBag: FormikHelpers<FormikValues>,
  ) => {
    if (values.password !== values.confirmPassword) {
      formikBag.setFieldError('password', 'Os campos não são iguais');
      formikBag.setFieldError('confirmPassword', 'Os campos não são iguais');
      return;
    }

    try {
      setDataState(states.loading);
      await createUser(values.name, values.email, values.password);
      setDataState(states.idle);
      navigation.goBack();
    } catch (error) {
      setDataState(states.error);
      console.log(error);
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <GoBackButton />

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
                  label={'Nome:'}
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  size="large"
                />
              </View>

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
                  caption={
                    formik.touched.password && !!formik.errors.password
                      ? formik.errors.password
                      : ''
                  }
                  status={
                    formik.touched.password && !!formik.errors.password
                      ? 'danger'
                      : 'basic'
                  }
                />
              </View>

              <View style={styles.fieldContainer}>
                <Input
                  label={'Confirmar senha:'}
                  value={formik.values.confirmPassword}
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={formik.handleChange('confirmPassword')}
                  caption={
                    formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : ''
                  }
                  status={
                    formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword
                      ? 'danger'
                      : 'basic'
                  }
                />
              </View>

              <Button
                onPress={formik.handleSubmit}
                accessoryLeft={
                  dataState === states.loading ? LoadingIcon : undefined
                }
                style={styles.login}>
                Criar conta
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

export default Signup;
