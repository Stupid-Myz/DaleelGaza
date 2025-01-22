import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import styles from './Admin.module.css';
import { Col, Row, Nav, InputGroup, Form, Button } from 'react-bootstrap';

function Admin() {
  const [selectedUser, setSelectedUser] = useState('user1');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [broadcastMessages, setBroadcastMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
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
    const privateRef = ref(database, 'messages/private/' + selectedUser);
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
  }, [selectedUser]);

  useEffect(function fetchUserMessages() {
    const userMessagesRef = ref(database, 'messages/private/admin');
    const unsubscribeUserMessages = onValue(userMessagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData);
        setUserMessages(messagesList);
      } else {
        setUserMessages([]);
      }
    });

    return function cleanupUserMessages() {
      unsubscribeUserMessages();
    };
  }, []);

  useEffect(function combineAndSortMessages() {
    const filteredUserMessages = userMessages.filter(
      (msg) => msg.from === selectedUser
    );

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
        filteredUserMessages.map((msg) => ({
          ...msg,
          type: 'private',
          sender: msg.from,
        }))
      );

    const sortedMessages = combinedMessages.sort((a, b) => a.timestamp - b.timestamp);
    setAllMessages(sortedMessages);
  }, [broadcastMessages, privateMessages, userMessages, selectedUser]);

  function handleSendBroadcastMessage() {
    if (broadcastMessage) {
      push(ref(database, 'messages/broadcast'), {
        message: broadcastMessage,
        timestamp: serverTimestamp(),
        from: adminName,
      });
      setBroadcastMessage('');
    } else {
      alert('Please enter a message to broadcast.');
    }
  }

  function handleSendPrivateMessage() {
    if (selectedUser && privateMessage) {
      push(ref(database, 'messages/private/' + selectedUser), {
        message: privateMessage,
        timestamp: serverTimestamp(),
        from: adminName,
      });
      setPrivateMessage('');
    } else {
      alert('Please select a user and enter a message.');
    }
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col xs={3} md={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                active={selectedUser === 'user1'}
                onClick={() => setSelectedUser('user1')}
              >
                User 1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedUser === 'user2'}
                onClick={() => setSelectedUser('user2')}
              >
                User 2
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={12} md={8}>
          <h2> 970 xxxxxxxxxx - {selectedUser}</h2>

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
            <h3>Broadcast Message</h3>
            <InputGroup className={styles.InputButton}>
              <Form.Control
                placeholder="Type a broadcast message..."
                aria-label="Type a broadcast message..."
                type="text"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleSendBroadcastMessage}>
                Send
              </Button>
            </InputGroup>
          </div>

          <div className={styles.section}>
            <h3>Send Private Message to {selectedUser}</h3>
            <InputGroup className={styles.InputButton}>
              <Form.Control
                placeholder="Type a private message..."
                aria-label="Type a private message..."
                type="text"
                value={privateMessage}
                onChange={(e) => setPrivateMessage(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleSendPrivateMessage}>
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

export default Admin;