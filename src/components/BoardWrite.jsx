import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BoardWrite = () => {

    const [board, setBoard] = useState({
       title: '',
       writer: '',
       contents: '' 
    });  

    const { title, writer, contents } = board;

    const onChange = (e) =>{
        const { name, value } = e.target;
        setBoard({
            ...board,
            [name]:value
        });
    };

    const onReset =()=>{
        setBoard({
            ...board,
            title: '',
            writer: '',
            contents: ''
        });
    };

    const onCreate = async ()=>{
        if(title === ''){
            alert('제목을 입력해주세요.');
            return;
        }
        if(writer === ''){
            alert('작성자를 입력해주세요.');
            return;
        }
        if(contents === ''){
            alert('내용을 입력해주세요.');
            return;
        }
        if(window.confirm('등록 하시겠습니까?')){
            try {
                await axios.post('/write', board);
                window.location.href ="/list";
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className='boardWrite'>
            <h2>게시글 작성</h2>
            <form action="" className='contents'>
                <div className='wrtCon'>
                    <input type="text" name='title'  value={title} placeholder='Title...' className='input-field' onChange={onChange} />
                    <input type="text" name='writer' value={writer} placeholder='Writer...' className='input-field' onChange={onChange} />
                    <textarea name='contents' value={contents} placeholder='Contents...' className='textarea-field' onChange={onChange} />
                </div>
                <div className='btns'>
                    <button onClick={onCreate} type='button'>제출</button>
                    <button onClick={onReset}>초기화</button>
                    <Link to={`/`}><button>목록</button></Link>
                </div>
            </form>
        </div>
    );
};

export default BoardWrite;