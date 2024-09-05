import React, { useRef, useState } from "react";


const Comment = () => {
    const [comments, setComments] = useState([]);
    const inputRef = useRef("");
    const [replies, setReplies] = useState({});

    const commentSubmit = () => {
        let currItem = inputRef.current.value
        if (inputRef.current.value) {
            const date = new Date();
            setComments((prev) => [
                ...prev,
                {
                    id: date,
                    comment: currItem,
                    reply: [],
                },
            ]);
        }
        inputRef.current.value = ''
    };

    const handleReplyChange = (id, val) => {
        setReplies((prev) => ({
            ...prev,
            [id]: val,
        }));
    };

    const handleReply = (id) => {
        let tempComments = comments;
        const itemINdex = comments.findIndex((item, index) => item.id === id);
        tempComments[itemINdex].reply = [
            ...tempComments[itemINdex].reply,
            replies[id],
        ];
        setComments([...tempComments]);
        setReplies((prev) => ({
            ...prev,
            [id]: "",
        }));
    };


    return (
        <div
            style={{
                display: "flex",
                background: "white",
                height: "100vh",

                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="comment"
                    style={{
                        height: 20,
                        width: 200,
                        border: "1px solid black",
                        color: "black",
                    }}
                />
                <button
                    style={{ color: "white", padding: 3, background: "blue" }}
                    onClick={commentSubmit}
                >
                    Add Comment
                </button>
            </div>
            {/* Comment */}
            <div>
                {comments.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1 style={{ color: "black" }}> comment: {item.comment}</h1>
                            <input
                                type="text"
                                placeholder="reply"
                                style={{
                                    height: 20,
                                    width: 200,
                                    border: "1px solid black",
                                    color: "black",
                                }}
                                onChange={(event) =>
                                    handleReplyChange(item.id, event.target.value)
                                }
                            />
                            {item.reply.map((item1, indexs) => {
                                return (
                                    <div key={indexs}>
                                        <h1 style={{ color: "black" }}>{item1}</h1>
                                    </div>
                                );
                            })}
                            <button
                                style={{ color: "white", padding: 3, background: "blue" }}
                                onClick={() => handleReply(item?.id)}
                            >
                                Reply
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Comment;
