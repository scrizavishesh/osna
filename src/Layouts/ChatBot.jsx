import React, { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Avatar,
    TextField,
    Button,
    Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// Chat Support Button and Popup

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box>
            {/* Static Chat Support Button */}
            {!isOpen && (
                <Button variant="contained"
                    onClick={toggleChat}
                    p={2}
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "#0462B6",
                        // border: "20px solid #114370",
                        boxShadow: "0px 4px 12px 0px #00000040",
                        color: "#fff",
                        borderRadius: "20px"

                    }}
                >
                    <ChatBubbleOutlineIcon />
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 100,
                            lineHeight: '21px',
                            textAlign: 'center',
                            color: "#FFFFFF",
                            mb: 1
                        }}
                    >
                        Chat Support
                    </Typography>
                </Button>
            )}

            {/* Popup Window */}
            {isOpen && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "350px",
                        height: "500px",
                        backgroundColor: "#fff",
                        // boxShadow: "0px 4px 16px 0px #00000040",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px 20px 0px 0px"
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            backgroundColor: "#0462B6",
                            color: "#fff",
                            padding: "10px",
                            boxShadow: "0px 24px 34px 0px #AE0A0A73",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "20px 20px 0px 0px"
                        }}
                    >
                        <Box>
                            <Typography variant="h6">OSNA</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Online
                            </Typography>
                        </Box>
                        <IconButton onClick={toggleChat} sx={{ color: "#fff" }}>
                            <MinimizeIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Section */}
                    <Box
                        sx={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#F9F9F9",
                            overflowY: "auto",
                        }}
                    >
                        {/* Sender Message */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#DEE2E6",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0px 1px 1px 0px #00000033",
                                }}
                            >
                                <Typography>Sample message from sender.</Typography>
                            </Box>
                        </Box>

                        {/* Receiver Message */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <Avatar
                                sx={{
                                    marginRight: "8px",
                                    boxShadow: "0px 4px 4px 0px #00000040",
                                }}
                                src="company-logo.png"
                            />
                            <Box
                                sx={{
                                    backgroundColor: "#004787",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    boxShadow: "0px 2px 1px 0px #0000000D",
                                }}
                            >
                                <Typography>Sample message from receiver.</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0px -4px 16px 0px #00000014",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "0px 0px 20px 20px"
                        }}
                    >
                        {/* Suggestions */}
                        <Box
                            sx={{
                                backgroundColor: "#F3F5F6",
                                padding: "5px",
                                marginBottom: "10px",
                                borderRadius: "8px",
                                boxShadow: "0px 1px 0px 0px #0000001F",
                            }}
                        >
                            <Typography>Suggestion 1, Suggestion 2</Typography>
                        </Box>

                        {/* Input Section */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type your message here..."
                                sx={{
                                    border: "1.5px solid #4361EE",
                                    borderRadius: "20px",
                                    marginRight: "10px",
                                }}
                            />
                            <IconButton sx={{ color: "#4361EE" }}>
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChatBot;
