import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const BoardModify = () => {

    const { id } = useParams();
    
    const [ mod, setMod ] = useState(null);

    const onChange = (e)=>{
        const {name, value} = e.target;
        setMod({
            ...mod,
            [name]:value
        });
    };

    const getBoard = async()=>{
        try {
            const res = await axios(`/modify/${id}`);
            setMod(res.data[0]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getBoard();
    },[]);

    const onUpdate = async()=>{
        if(mod.title === ''){
            alert('title is null!!');
            return;
        }
        if(mod.writer === ''){
            alert('writer is null!!!');
            return;
        }
        if(mod.contents === ''){
            alert('contents is null!!!');
            return;
        }
        if(window.confirm('수정 하시겠습니까?')){
            try {
                const res = await axios.post(`/modify/${id}`, mod);
                console.log(res);
                window.location.href =`/detail/${id}`;
            } catch (error) {
                console.log(error);
            }
        }
    }

    if(mod !==null){
        return (
            <div className='boardModify'>
                <h2>게시글 수정</h2>
                <form action="" className='contents'>
                    <div className='wrtCon'>
                        <input type="text" name='title'  value={mod.title} placeholder='Title...' className='input-field' onChange={onChange} />
                        <input type="text" name='writer' value={mod.writer} placeholder='Writer...' className='input-field' onChange={onChange} />
                        <textarea name='contents' value={mod.contents} placeholder='Content...' className='textarea-field' onChange={onChange} />
                    </div>
                    <div className='btns'>
                        <button type='button' onClick={onUpdate}>제출</button>
                        <Link to={`/`}><button>목록</button></Link>
                    </div>
                </form>
            </div>
        );
    }
};

export default BoardModify;