import { useState, useRef, useEffect } from 'react';
import NavBar from '../components/navBar';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { FaRocket } from 'react-icons/fa';
import '../style/messaging.css';
import { useAuth } from '../contexts/authContext';
import {
  sendMessage,
  fetchMessagesList,
  getMessageByThreadId,
} from '../api/message';
import { useSearchParams } from 'react-router-dom';

const MessagingPage = () => {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 760);

  const messageContainerRef = useRef(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const threadId = searchParams.get('threadId');
  const userName = searchParams.get('userName');
  const itemName = searchParams.get('itemName');

  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(
    threadId && userName ? { threadId, userName, itemName } : null
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 760);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update selected user when URL params change
  useEffect(() => {
    const threadId = searchParams.get('threadId');
    const userName = searchParams.get('userName');
    const itemName = searchParams.get('itemName');

    if (threadId && userName) {
      setSelectedUser({ threadId, userName, itemName });
      setSelectedThreadId(threadId);
    } else {
      setSelectedUser(null);
      setSelectedThreadId(null);
    }
  }, [searchParams]);

  // Function to scroll to bottom
  const scrollToBottom = (behavior = 'auto') => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  // WebSocket for real-time messaging
  useEffect(() => {
    if (!currentUser?.accessToken) return;

    const ws = new WebSocket(
      `ws://localhost:8000?token=${currentUser.accessToken}`
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg);
      if (selectedUser && msg.threadId === selectedUser.threadId) {
        setCurrentChat((prev) => [
          ...prev,
          {
            ...msg,
            type: msg.senderId === currentUser.uid ? 'sent' : 'received',
          },
        ]);

        // If we're already at the bottom, scroll to show new message
        if (isScrolledToBottom) {
          setTimeout(scrollToBottom, 100);
        }
      }

      // Update thread list
      setMessages((prev) => {
        const updated = [...prev];
        const idx = updated.findIndex((m) => m.threadId === msg.threadId);
        if (idx !== -1)
          updated[idx] = { ...updated[idx], lastMessage: msg.message };
        return updated;
      });
    };

    return () => ws.readyState <= 1 && ws.close(); // Close WebSocket connection
  }, [currentUser?.accessToken, selectedUser, isScrolledToBottom]);

  // Fetch message threads
  useEffect(() => {
    if (!currentUser) return;
    fetchMessagesList(currentUser)
      .then((messageList) => {
        console.log('Message list from API:', messageList);
        setMessages(messageList);
      })
      .catch((err) => console.error('Error fetching messages:', err));
  }, [currentUser]);

  // Fetch messages for selected thread
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    getMessageByThreadId(selectedUser.threadId, currentUser, {
      limit: 20,
      offset: 0,
    })
      .then((chat) => {
        console.log(chat);
        console.log(currentUser);

        const formattedChat = chat.map((msg) => ({
          ...msg,
          type: msg.sender === currentUser.uid ? 'sent' : 'received',
        }));
        setCurrentChat(formattedChat);

        // Scroll to bottom after loading messages
        setTimeout(scrollToBottom, 100);
        setIsScrolledToBottom(true);
      })
      .catch((err) => console.error('Error fetching thread messages:', err));
  }, [selectedUser, currentUser]);

  // Check if scrolled to bottom
  const handleScroll = () => {
    if (!messageContainerRef.current) return;

    const container = messageContainerRef.current;
    const isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 50;

    setIsScrolledToBottom(isAtBottom);

    // Load more messages when scrolled to top
    if (container.scrollTop === 0 && selectedUser && currentChat.length > 0) {
      loadOlderMessages();
    }
  };

  // Load older messages
  const loadOlderMessages = async () => {
    if (!selectedUser || !currentUser || currentChat.length === 0) return;

    try {
      const oldestMessageId = currentChat[0]?.id;
      const moreMessages = await getMessageByThreadId(
        selectedUser.threadId,
        currentUser,
        {
          before: oldestMessageId,
          limit: 20,
        }
      );

      if (moreMessages?.length > 0) {
        const formattedMessages = moreMessages.map((msg) => ({
          ...msg,
          type: msg.sender === currentUser.uid ? 'sent' : 'received',
        }));

        // Save current scroll height and position
        const container = messageContainerRef.current;
        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;

        // Update messages
        setCurrentChat((prev) => [...formattedMessages, ...prev]);

        // Maintain scroll position after new messages are loaded
        setTimeout(() => {
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
              messageContainerRef.current.scrollHeight -
              scrollHeight +
              scrollTop;
          }
        }, 50);
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
    }
  };

  // Send message function
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const tempId = Date.now();
    const newMsg = {
      id: tempId,
      senderId: currentUser.id,
      message: newMessage,
      type: 'sent',
      threadId: selectedUser.threadId,
    };

    // Clear input field immediately
    const messageToSend = newMessage;
    setNewMessage('');

    // Add message to chat
    setCurrentChat((prev) => [...prev, newMsg]);

    // Scroll to bottom immediately after sending
    setTimeout(scrollToBottom, 50);
    setIsScrolledToBottom(true);

    try {
      const response = await sendMessage(threadId, messageToSend, currentUser);
      if (response?.messageInfo) {
        setCurrentChat((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...response.messageInfo, type: 'sent' } : msg
          )
        );
      }
    } catch (error) {
      console.error('Send error:', error);
    }
  };

  const handleSelectUser = (threadId, userName, itemName) => {
    setSelectedUser({ threadId, userName, itemName });
    setSelectedThreadId(threadId);
    navigate(
      `/messageList/?threadId=${threadId}&userName=${userName}&itemName=${encodeURIComponent(
        itemName || ''
      )}`
    );
  };

  const backToSidebar = () => navigate('/messageList');

  const listThreads = messages.map((item, index) => (
    <li
      key={index}
      onClick={() =>
        handleSelectUser(item.threadId, item.otherParty, item.productName)
      }
      className={`list-thread ${
        selectedThreadId === item.threadId ? 'selected' : ''
      }`}
    >
      <div className="thread-user">{item.otherParty}</div>
      <div className="thread-item">{item.productName}</div>
    </li>
  ));

  return (
    <div>
      <NavBar />
      <Container fluid className="mt-3 messaging-container">
        <Row className="message-page-view">
          <Col
            md={5}
            lg={3}
            sm={selectedUser == null ? 12 : 0}
            className="threads-column"
            style={{
              display: selectedUser != null && isMobileView ? 'none' : 'block',
            }}
          >
            <Card.Header className="threads-header">
              <h5 className="mb-0">Chats</h5>
              <ul className="list-unstyled">{listThreads}</ul>
            </Card.Header>
          </Col>

          <Col md={7} lg={9} className="chat-section">
            {selectedUser ? (
              <Card className="chat-card">
                <Card.Header className="chat-header">
                  <h6 className="mb-0">
                    {' '}
                    Seller Name:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedUser.userName}{' '}
                    </span>
                    {selectedUser.itemName && (
                      <>
                        <hr /> <span>{selectedUser.itemName}</span>
                      </>
                    )}
                  </h6>
                  <Button variant="secondary" onClick={backToSidebar}>
                    Close
                  </Button>
                </Card.Header>

                <Card.Body
                  ref={messageContainerRef}
                  className="message-container"
                  onScroll={handleScroll}
                >
                  {currentChat?.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}>
                      <div className="message-content">
                        <div className="content">{message.message}</div>
                      </div>
                    </div>
                  ))}
                </Card.Body>

                <Card.Footer className="chat-footer">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                    />
                    <Button variant="primary" onClick={handleSendMessage}>
                      <FaRocket />
                    </Button>
                  </InputGroup>
                </Card.Footer>
              </Card>
            ) : (
              <div className="text-center p-5">
                <h4>Select a conversation to start chatting</h4>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagingPage;
