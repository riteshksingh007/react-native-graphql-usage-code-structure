import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PaymentScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1FD',
  },

  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },

  summaryBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#f8f8ff',
    borderWidth: 1,
    borderColor: '#eee',
  },

  ////// Modal //////

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#222',
    fontFamily: 'AvenirNext-Medium',
  },

  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
    fontFamily: 'AvenirNext-Regular',
  },
});

export default PaymentScreenStyles;
