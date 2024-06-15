import React, { useRef } from 'react';
// Import Mui Material components to build the chat in an easier way
import { Button, CssBaseline, Container, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';

interface Props {
  isConnected: boolean; // Specify if the user is connected to the websocket or not
  members: string[] | undefined; // The websocket returns a list of connected members
  chatRows: React.ReactNode[] | undefined; // The chat rows are generated with each new upcoming message
  onPublicMessage: () => void; // Function to send a message to all the members 
  onPrivateMessage: (to: string) => void; // Function to send a message depending on the selected agent
  onConnect: () => void; // Function that states if a new user is connected to the WS
  onDisconnect: () => void; // Function that alerts if the connection to the WS of a certain agent no longer exists
}

// Construction of the chat

export const ChatClient = (props: Props) => {
  const buttonRef = useRef(null); 

  // Chat Formatting
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
              {props.members?.map(item => (
                <ListItem key={item} onClick={() => { props.onPrivateMessage(item); }} button>
                  <ListItemText style={{ fontWeight: 800 }} primary={item} />
                </ListItem>
              ))}
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
                    {props.chatRows?.map((item, i) => (
                      <li key={i} style={{ paddingBottom: 9 }}>{item}</li>
                    ))}
                  </ul>
                </Grid>
                <Grid item style={{ margin: 10 }}>
                  {props.isConnected && (
                    <Button
                      ref={buttonRef}
                      style={{ marginRight: 7 }}
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onPublicMessage}
                    >
                      Send Public Message
                    </Button>
                  )}
                  {props.isConnected && (
                    <Button
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onDisconnect}
                    >
                      Disconnect
                    </Button>
                  )}
                  {!props.isConnected && (
                    <Button
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onConnect}
                    >
                      Connect
                    </Button>
                  )}
                </Grid>
              </Grid>
              <div style={{
                position: 'absolute',
                right: 9,
                top: 8,
                width: 12,
                height: 12,
                backgroundColor: props.isConnected ? '#00da00' : '#e2e2e2',
                borderRadius: 50,
              }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};