import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import styles from './User.module.css';
import { Col, Row, InputGroup, Form, Button } from 'react-bootstrap';

function User({ userId }) {
  const [broadcastMessages, setBroadcastMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const adminName = "Daleel Gaza - 970 xxxxxxxxxx";

  useEffect(function fetchBroadcastMessages() {
    const broadcastRef = ref(database, 'messages/broadcast');
    const unsubscribeBroadcast = onValue(broadcastRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData);
        setBroadcastMessages(messagesList);
      } else {
        setBroadcastMessages([]);
      }
    });

    return function cleanupBroadcast() {
      unsubscribeBroadcast();
    };
  }, []);

  useEffect(function fetchPrivateMessages() {
    const privateRef = ref(database, 'messages/private/' + userId);
    const unsubscribePrivate = onValue(privateRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData);
        setPrivateMessages(messagesList);
      } else {
        setPrivateMessages([]);
      }
    });

    return function cleanupPrivate() {
      unsubscribePrivate();
    };
  }, [userId]);

  useEffect(function fetchUserMessages() {
    const userMessagesRef = ref(database, 'messages/private/admin');
    const unsubscribeUserMessages = onValue(userMessagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData).filter(
          (msg) => msg.from === userId
        );
        setUserMessages(messagesList);
      } else {
        setUserMessages([]);
      }
    });

    return function cleanupUserMessages() {
      unsubscribeUserMessages();
    };
  }, [userId]);

  useEffect(function combineAndSortMessages() {
    const combinedMessages = broadcastMessages
      .map((msg) => ({
        ...msg,
        type: 'broadcast',
        sender: adminName,
      }))
      .concat(
        privateMessages.map((msg) => ({
          ...msg,
          type: 'private',
          sender: adminName,
        }))
      )
      .concat(
        userMessages.map((msg) => ({
          ...msg,
          type: 'private',
          sender: 'You',
        }))
      );

    const sortedMessages = combinedMessages.sort((a, b) => a.timestamp - b.timestamp);
    setAllMessages(sortedMessages);
  }, [broadcastMessages, privateMessages, userMessages]);

  function handleSendUserMessage() {
    if (userMessage) {
      push(ref(database, 'messages/private/admin'), {
        message: userMessage,
        timestamp: serverTimestamp(),
        from: userId,
      });
      setUserMessage('');
    } else {
      alert('Please enter a message.');
    }
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={12} md={8}>
          <h2>{userId} Chat</h2>

          <div className={styles.messages}>
            {allMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === adminName
                    ? styles.messageAdmin
                    : styles.messageUser
                }
              >
                <strong>
                  {msg.sender === adminName ? adminName : msg.sender}:
                </strong>{' '}
                {msg.message}
                <div className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <h3>Send Private Message to Admin</h3>
            <InputGroup className={styles.InputButton}>
              <Form.Control
                placeholder="Type your message..."
                aria-label="Type your message..."
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleSendUserMessage}>
                Send
              </Button>
            </InputGroup>
          </div>
        </Col>
        <Col xs={3} md={2}></Col>
      </Row>
    </div>
  );
}

export default User;