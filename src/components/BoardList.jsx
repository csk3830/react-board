import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

const BoardList = () => {

    // db값 변수에 저장
    const [ boardList, setBoardList ] = useState([]);

    const getBoardData = async()=>{
        try {
            const boards = await axios('/list');
            setBoardList(boards.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        getBoardData();
    },[]);

    const navigate = useNavigate();

    const trClick = async (id) => {
        try {
            // 클릭된 게시글의 조회수 증가
            await axios.post(`/views/${id}`);
            // 디테일 페이지로 이동
            navigate(`/detail/${id}`);
        } catch (error) {
            console.log(error);
        }

    };

    if(boardList.length>0){
        return (
            <div className='boardList'>
                <h2>게시글 목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map(l => (
                            <tr key={l.id}>
                                <td>{l.id}</td>
                                <td className='title' onClick={()=> trClick(l.id)}>{l.title}</td>
                                <td>{l.writer}</td>
                                <td>{l.reg_date.substring(0, l.reg_date.indexOf("T"))}</td>
                                <td>{l.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='listBot'>
                    <Link to={`/write`}><button>글쓰기</button></Link>          
                </div>
            </div>
        );
    };
    return <div>Loading...</div>;
};

export default BoardList;