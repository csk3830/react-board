import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Comment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ user: '', content: '' });

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await axios.get(`/comments/${postId}`);
        setComments(response.data);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/comments', { postId, ...newComment });
        setNewComment({ user: '', content: '' });
        fetchComments();
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            await axios.delete(`/comments/${commentId}`);
            fetchComments(); // 삭제 후 댓글 목록 새로고침
        }
    };

    return (
        <div className='comment'>
            <form onSubmit={handleCommentSubmit}>
                <input
                    className='cmt-writer'
                    type="text"
                    placeholder="작성자.."
                    value={newComment.user}
                    onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
                    required
                />
                <input
                    className='cmt-contents'
                    type='text'
                    placeholder="댓글 내용.."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                />
                <button className='com-submit'>댓글등록</button>
            </form>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <span>{comment.user}</span><br /><strong>{comment.content} </strong>
                        <button onClick={() => handleDeleteComment(comment.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;