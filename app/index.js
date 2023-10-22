import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import messages from '../assets/messages.json';
import { Link } from 'expo-router';
import { MessageItem } from './components/MessageItem';
import { styles } from './index.styles';

const App = () => {
    const [latestMessages, setLatestMessages] = useState([]);
    const [showClickMessage, setShowClickMessage] = useState(false);

    useEffect(() => {
        let tempArray = [];

        for (const chatRoom of messages) {
            const latestMessage = chatRoom.messages[chatRoom.messages.length - 1];
            tempArray.push({
                chatRoomId: chatRoom.chatRoomId,
                sender: latestMessage.senderId,
                // troncate the message if it's too long
                message: latestMessage.message.length > 40 ? `${latestMessage.message.substring(0, 40)}...` : latestMessage.message,
            });
        }

        setLatestMessages(tempArray);

        // Set a timeout to show the click message after 3 seconds
        const timeoutId = setTimeout(() => {
            setShowClickMessage(true);
        }, 3000);

        // Clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest Messages</Text>
            <FlatList
                data={latestMessages}
                renderItem={({ item }) => (
                    <Link href={`/chat/${item.chatRoomId}`} component={MessageItem}>
                        <MessageItem
                            sender={item.sender}
                            message={item.message}
                        />
                    </Link>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {showClickMessage && (
                <Text style={styles.clickMessage}>Cliquer sur l'un des derniers message pour voir la discussion</Text>
            )}
        </View>
    );
};

export default App;
