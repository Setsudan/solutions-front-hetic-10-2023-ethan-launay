import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../index.styles';

export const MessageItem = ({ sender, message }) => (
    <View style={styles.messageItem}>
        <Text style={styles.sender}>{sender}</Text>
        <Text style={styles.message}>{message}</Text>
    </View>
);
