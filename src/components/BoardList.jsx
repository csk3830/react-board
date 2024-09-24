import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('title'); 
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            page: parseInt(params.get('page')) || 1,
            search: params.get('search') || '',
            category: params.get('category') || 'title' 
        };
    };

    const getBoardData = async (page, search = '', category = 'title') => {
        setLoading(true);
        try {
            const response = await axios(`/list?page=${page}&search=${search}&category=${category}`);
            setBoardList(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { page, search, category } = getQueryParams();
        setCurrentPage(page);
        setSearchTerm(search);
        setSearchCategory(category);
        getBoardData(page, search, category);
    }, [location.search]);

    const handleSearch = () => {
        setCurrentPage(1);
        getBoardData(1, searchTerm, searchCategory);
    };

    //Enter로 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const navigate = useNavigate();

    const trClick = async (id) => {
        try {
            await axios.post(`/views/${id}`);
            navigate(`/detail/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        navigate(`?page=${newPage}&search=${searchTerm}&category=${searchCategory}`);
    };

    const getPageButtons = () => {
        const buttons = [];
        const startPage = pageGroup * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='boardList'>
            <h2>📢 상호 존중하고 배려하며, 비방 금지</h2>
            <div className='searchs'>
                <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                    <option value="writer">작성자</option>
                </select>
                <input
                    type="text"
                    placeholder="검색어 입력..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
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
                    {boardList.length > 0 ? (
                        boardList.map(l => (
                            <tr key={l.id}>
                                <td>{l.id}</td>
                                <td className='title' onClick={() => trClick(l.id)}>
                                    {l.title}
                                    <strong>
                                        {l.comment_count > 0 && ` [${l.comment_count}]`}
                                    </strong>
                                </td>
                                <td>{l.writer}</td>
                                <td>{l.reg_date.substring(0, l.reg_date.indexOf("T"))}</td>
                                <td>{l.views}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>게시글이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='pagination'>
                {pageGroup > 0 && <button onClick={() => setPageGroup(prev => Math.max(prev - 1, 0))}>이전</button>}
                {getPageButtons()}
                {pageGroup < Math.ceil(totalPages / 10) - 1 && <button onClick={() => setPageGroup(prev => prev + 1)}>다음</button>}
            </div>
            <div className='listBot'>
                <Link to={`/write`}><button>글쓰기</button></Link>
            </div>
        </div>
    );
};

export default BoardList;
