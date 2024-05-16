import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button, CssBaseline, Container, Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';

const UserChat = () => {
  const { username, socket, isConnected } = useAuth(); // Get the username and socket from useAuth
  const [members, setMembers] = useState<string[]>([]);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);

  const onSocketMessage = useCallback((dataStr: string) => {
    const data = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage) {
      setChatRows(oldArray => [...oldArray, <span><b>{data.publicMessage}</b></span>]);
    } else if (data.privateMessage) {
      setChatRows(oldArray => [...oldArray, <span><i>Private from {data.from}: {data.privateMessage}</i></span>]);
    } else if (data.systemMessage) {
      setChatRows(oldArray => [...oldArray, <span><i>{data.systemMessage}</i></span>]);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', (event: MessageEvent) => {
        onSocketMessage(event.data);
      });
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', (event: MessageEvent) => {
          onSocketMessage(event.data);
        });
      }
    };
  }, [socket, onSocketMessage]);

  const onSendPrivateMessage = useCallback((to: string) => {
    const message = prompt('Enter private message for ' + to);
    if (message && socket) {
      socket.send(JSON.stringify({
        action: 'sendPrivate',
        message,
        to,
      }));
    }
  }, [socket]);

  const onSendPublicMessage = useCallback(() => {
    const message = prompt('Enter public message');
    if (message && socket) {
      socket.send(JSON.stringify({
        action: 'sendPublic',
        message,
      }));
    }
  }, [socket]);

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#f4ede3',
      display: 'flex',
      alignItems: 'center',
    }}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: '90%' }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={2} style={{ backgroundColor: '#3e103f', color: 'white' }}>
            <List component="nav">
              {members.map(item =>
                <ListItem key={item} onClick={() => { onSendPrivateMessage(item); }} button>
                  <ListItemText style={{ fontWeight: 800 }} primary={item} />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid style={{ position: 'relative' }} item container direction="column" xs={10} >
            <Paper style={{ flex: 1 }}>
              <Grid item container style={{ height: '100%' }} direction="column">
                <Grid item container style={{ flex: 1 }}>
                  <ul style={{
                    paddingTop: 20,
                    paddingLeft: 44,
                    listStyleType: 'none',
                  }}>
                    {chatRows.map((item, i) =>
                      <li key={i} style={{ paddingBottom: 9 }}>{item}</li>
                    )}
                  </ul>
                </Grid>
                <Grid item style={{ margin: 10 }}>
                  {isConnected && <Button style={{ marginRight: 7 }} variant="outlined" size="small" disableElevation onClick={onSendPublicMessage}>Send Public Message</Button>}
                  {isConnected && <Button variant="outlined" size="small" disableElevation onClick={() => socket?.close()}>Disconnect</Button>}
                  {!isConnected && <Button variant="outlined" size="small" disableElevation onClick={() => socket?.open()}>Connect</Button>}
                </Grid>
              </Grid>
              <div style={{
                position: 'absolute',
                right: 9,
                top: 8,
                width: 12,
                height: 12,
                backgroundColor: isConnected ? '#00da00' : '#e2e2e2',
                borderRadius: 50,
              }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
};

export default UserChat;
