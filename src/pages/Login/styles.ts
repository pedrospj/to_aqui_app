import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logo: {
    height: 250,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
  },

  fieldContainer: {
    marginBottom: '5%',
  },

  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  loadingIcon: {},

  createAccount: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8%',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalText: {
    fontWeight: '600',
    marginBottom: '5%',
  },
  modalButton: {
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default styles;
