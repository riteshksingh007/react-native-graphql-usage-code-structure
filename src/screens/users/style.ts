import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      radioLabel: {
        fontSize: 16,
      },
      separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
      },
      userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#e0e6f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      },
      avatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3d5afe',
      },
      userName: {
        fontSize: 16,
        fontWeight: '500',
      },
      userRole: {
        fontSize: 14,
        color: '#666',
      },
});


export default styles;