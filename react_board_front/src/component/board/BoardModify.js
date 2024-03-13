import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./boardModify.css";
import { useState } from "react";
import axios from "axios";

const BoardModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const board = location.state.board;
  //   const params = useParams();
  //   console.log("과으연", params);
  const [boardTitle, setBoardTitle] = useState(board.boardTitle);
  const changeTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  const [boardContent, setBoardContent] = useState(board.boardContent);
  const changeContent = (e) => {
    setBoardContent(e.target.value);
  };

  const boardNo = board.boardNo;
  const modify = () =>{
    const obj = {boardNo, boardTitle, boardContent};
    axios
    .post("http://192.168.10.20:8888/board", obj)
    .then((res) =>{
      if(res.data.message === "수정 성공"){
        navigate("/boardView/" + boardNo);
      }else{
        navigate("/boardList");
      }
    })
    .catch((res) =>{
      console.log(res);
    });
  };
  return (
    <div className="modify-wrap">
      <h2 className="modify-title">게시글 수정</h2>
      <table className="modify-tbl">
        <tbody>
          <tr>
            <th>글번호</th>
            <td>{board.boardNo}</td>
          </tr>
          <tr>
            <th>글제목</th>
            <td>
              <input
                id="boardTitle"
                type="text"
                value={boardTitle}
                onChange={changeTitle}
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{board.boardWriter}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{board.boardDate}</td>
          </tr>
          <tr>
            <th>글내용</th>
            <td>
              <textarea
                id="boardContent"
                value={boardContent}
                onChange={changeContent}
              ></textarea>
            </td>
          </tr>
          <tr>
            <th id="modify-btn" colSpan={2}>
              <button onClick={modify}>수정하기</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoardModify;
