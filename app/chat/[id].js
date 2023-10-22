import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Link } from 'react-native';
import messages from '../../assets/messages.json';
import { useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';

const sender = 'Michael';
const findChatRoom = id => messages.find(chatRoom => chatRoom.chatRoomId === id);
const addMessage = (id, message) => {
    const chatRoom = findChatRoom(id);
    chatRoom.messages.push(message);
};
const getReceiver = id => {
    const chatRoom = findChatRoom(id);
    const { participants } = chatRoom;
    const receiver = participants.find(participant => participant !== sender);
    return receiver;
};

const ChatRoom = () => {
    const { id } = useLocalSearchParams();
    const chatRoom = findChatRoom(id);
    const [chatroomMessages, setChatroomMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const chatRoom = findChatRoom(id);
        setChatroomMessages(chatRoom.messages);
    }, [id]);

    const sendMessage = () => {
        addMessage(id, {
            senderId: sender,
            message: message,
            receiverId: getReceiver(id),
            timestamp: new Date().toISOString(),
        });
        setChatroomMessages(findChatRoom(id).messages);
        setMessage('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Chat Room {chatRoom.chatRoomName} ({chatroomMessages.length} messages)
            </Text>
            <FlatList
                data={chatroomMessages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.sender}>{item.senderId}</Text>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput style={styles.input}
                onChangeText={text => setMessage(text)}
                value={message}
                placeholder="Type a message..." clearButtonMode='while-editing' />
            <Button title="Send"
                onPress={() => {
                    sendMessage();
                    setChatroomMessages(findChatRoom(id).messages);
                    setMessage('');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sender: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    sendButton: {
        marginLeft: 10,
    },
    backLink: {
        marginBottom: 10,
    },
    backLinkText: {
        fontSize: 16,
        color: '#0064e1',
    },
});

export default ChatRoom;
