import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const BoardDetail = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    
    const getBoard = async () => {
        try {
            const res = await axios(`/detail/${id}`);
            setBoard(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

    const onDelete = async () => {
        if (window.confirm('정말 삭제 하시겠습니까?')) {
            try {
                await axios.post(`/delete/${id}`);
                window.location.href = "/list";
            } catch (e) {
                console.log(e);
            }
        }
    };

    if (board != null) {
        return (
            <div className='boardDetail'>
                <h2>No.{board.id} / 게시글 상세</h2>
                <div className='contents'>
                    <h3>{board.title}</h3>
                    <div className='writer'>
                        <span>{board.writer} </span>
                        <span>[{board.reg_date.substring(0, board.reg_date.indexOf("T"))}]</span>
                        <span>조회:{board.views}</span>
                    </div>
                    <div className='con'>{board.contents}</div>
                </div>
                <div className='btns'>
                    <Link to={`/modify/${board.id}`}><button>수정</button></Link>
                    <button onClick={onDelete}>삭제</button>
                    <Link to={`/`}><button>목록</button></Link>
                </div>
                <Comment postId={board.id} />
            </div>
        );
    }

    return <div>Loading...</div>; // 로딩 상태 표시
};

export default BoardDetail;
