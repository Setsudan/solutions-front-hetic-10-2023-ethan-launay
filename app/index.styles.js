import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    messageItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatRoomName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sender: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 16,
    },
    clickMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
});
