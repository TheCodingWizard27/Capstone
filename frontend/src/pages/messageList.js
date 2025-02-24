import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../components/navBar';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Image,
} from 'react-bootstrap';
import { FaPaperPlane, FaPlus, FaBars, FaPaperclip } from 'react-icons/fa';
import '../style/messaging.css';
import { useAuth } from '../contexts/authContext';
import {
  sendMessage,
  fetchMessagesList,
  getMessageByThreadId,
} from '../api/message'; //Function to make send message api call

const MessagingPage = () => {
  const { currentUser } = useAuth();
  const [receivedMessage, setReceivedMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 760);
  const messageEndRef = useRef(null);

  // Update mobile view state on resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 760);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Websocket connection on current user token change
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000?token=${currentUser.accessToken}`
    );
    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      ws.send('Hello from the client!');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from the server');
    };
  }, [currentUser.accessToken]);

  // Fetch messages list on component mount
  useEffect(() => {
    async function fetchData() {
      let messageList = await fetchMessagesList(currentUser);
      setMessages([...messageList]);
    }

    fetchData();

    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentUser.accessToken]);

  //Load all messages from thread
  useEffect(() => {
    async function fetchData() {
      let chat = await getMessageByThreadId(selectedUser.threadId, currentUser);
      setCurrentChat([...chat]);
    }
    if (selectedUser != null) {
      fetchData();

      console.log(currentChat);
    }
  }, [selectedUser]);

  // File upload handler
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ];
    const validVideoTypes = [
      'video/mp4',
      'video/mov',
      'video/WMV',
      'video/webm',
    ];
    const validOtherTypes = ['application/pdf'];
    const maxImageSize = 3 * 1024 * 1024; // 3MB
    const maxVideoSize = 20 * 1024 * 1024; // 20MB
    const maxOtherSize = 5 * 1024 * 1024; // 5MB
    const newUploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;

      if (validImageTypes.includes(fileType) && file.size <= maxImageSize) {
        if (
          newUploadedFiles.filter((f) => validImageTypes.includes(f.type))
            .length < 5
        ) {
          newUploadedFiles.push(file);
        } else {
          alert('You can only upload up to 5 images at a time.');
        }
      } else if (
        validVideoTypes.includes(fileType) &&
        file.size <= maxVideoSize
      ) {
        if (!newUploadedFiles.some((f) => validVideoTypes.includes(f.type))) {
          newUploadedFiles.push(file);
        } else {
          alert('You can only upload 1 video at a time.');
        }
      } else if (
        validOtherTypes.includes(fileType) &&
        file.size <= maxOtherSize
      ) {
        if (!newUploadedFiles.some((f) => validOtherTypes.includes(f.type))) {
          newUploadedFiles.push(file);
        } else {
          alert('You can only upload 1 document at a time.');
        }
      } else if (file.size <= maxOtherSize) {
        if (!newUploadedFiles.some((f) => f.name === file.name)) {
          newUploadedFiles.push(file);
        } else {
          alert('You can only upload 1 non-media file at a time.');
        }
      } else {
        alert('Invalid file type or size.');
      }
    }

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || uploadedFiles.length > 0) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [
          ...prevMessages[selectedUser],
          {
            id: Date.now(),
            sender: 'You',
            profilePic: 'https://via.placeholder.com/30',
            time: 'Just now',
            content: newMessage,
            type: 'sent',
            files: uploadedFiles,
          },
        ],
      }));
      setNewMessage('');
      setUploadedFiles([]);
    }
    sendMessage(1, 1, newMessage, currentUser); //APi call to the backend
  };

  const handleSelectUser = (threadId, userName) => {
    setSelectedUser({ threadId, userName });
  };

  const backToSidebar = () => {
    setSelectedUser(null);
  };

  const listThreads = messages.map((item, index) => (
    <li
      onClick={() => handleSelectUser(item.threadId, item.otherParty)}
      key={index}
    >
      {item.otherParty}
    </li>
  ));

  return (
    <div>
      <NavBar />
      <Container fluid className="mt-3 messaging-container">
        {/**Sidebar */}
        <Row className="message-page-view">
          <Col
            md={5}
            lg={3}
            sm={selectedUser == null ? 12 : 0}
            style={{
              overflowY: 'auto',
              transition: 'all 0.3s ease-in-out',
              display: selectedUser != null && isMobileView ? 'none' : 'block', // Ensures it is hidden when needed
            }}
          >
            <Card className="vh-90 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Chats</h5>
              </div>
              <ul className="list-unstyled">{listThreads}</ul>
            </Card>
          </Col>

          {/** Chat section */}
          <Col md={7} lg={9} className="chat-section">
            {selectedUser ? (
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{selectedUser.userName}</h6>
                  <Button variant="secondary" onClick={backToSidebar}>
                    Close
                  </Button>
                </Card.Header>

                <Card.Body
                  style={{
                    flex: 1,
                    height: '70%',
                    overflowY: 'scroll',
                  }}
                >
                  {currentChat?.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.type === 'sent' ? 'sent' : 'received'
                      } d-flex align-items-center`}
                    >
                      {message.type === 'received' && (
                        <Image
                          src={message.profilePic}
                          roundedCircle
                          className="profile-pic me-2"
                        />
                      )}
                      <div className="message-content">
                        <div className="content">{message.message}</div>
                        <small className="time">{message.time}</small>
                      </div>
                      {message.type === 'sent' && (
                        <Image
                          src={message.profilePic}
                          roundedCircle
                          className="profile-pic ms-2"
                        />
                      )}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </Card.Body>

                <Card.Footer
                  style={{
                    position: 'relative',
                    bottom: 0,
                    width: '100%',
                  }}
                >
                  <InputGroup>
                    <Button variant="light">
                      <Form.Label htmlFor="fileUpload" className="m-0">
                        <FaPaperclip />
                      </Form.Label>
                    </Button>
                    <Form.Control
                      type="file"
                      id="fileUpload"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      accept="image/jpeg, image/jpg, image/png, image/gif, video/mp4, video/mov, video/WMV, video/webm, application/pdf"
                    />
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
                      <FaPaperPlane />
                    </Button>
                  </InputGroup>

                  <div className="uploaded-files mt-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="uploaded-file">
                        {file.type.startsWith('image/') && (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Uploaded"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        )}
                        {file.type.startsWith('video/') && (
                          <video
                            src={URL.createObjectURL(file)}
                            controls
                            style={{ maxWidth: '200px' }}
                          />
                        )}
                        {file.type === 'application/pdf' && (
                          <a
                            href={URL.createObjectURL(file)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </a>
                        )}
                        <small>{file.name}</small>
                      </div>
                    ))}
                  </div>
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
