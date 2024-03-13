import { useParams } from "react-router-dom";
import "./boardView.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BoardView = () => {
  const params = useParams();
  const boardNo = params.boardNo;
  // hook은 항상 컴포넌트 중괄호 레벨에서 만들어야 함
  const navigate = useNavigate();

  /*
  useEffect(() => {
    console.log("useEffect 내부");
    axios
      .get("http://192.168.10.20:8888/board/list")
      .then((res) => {
        setBoardList(res.data); // 상태 업데이트
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("useEffect 후");
  */

  const [board, setBoard] = useState({});

  //axios에서 board 조회해서 세팅해줄 것
  //set이 특정한 행동을 했을 때 돌아가면(ex: btn) useEffect를 안해도 됨
  //지금은 아무것도 안해도 돌아가야해서 useEffect 필요

  useEffect(() => {
    axios
      .get("http://192.168.10.20:8888/board/view/" + boardNo)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const deleteBoard = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .get("http://192.168.10.20:8888/board/delete/" + boardNo)
        .then((res) => {
          if (res.data === 1) {
            navigate("/boardList");
          } else {
            alert("문제발생 빨리찾아");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const modifyBoard = () => {
    navigate("/boardModify", { state: { board: board } });
  };

  return (
    <div className="board-view-wrap">
      <h2 className="board-view-title">게시글 상세보기</h2>
      <table className="board-view-tbl">
        <tbody>
          <tr>
            <th width="10%">글번호</th>
            <td width="90%">{board.boardNo}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{board.boardTitle}</td>
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
            <th>내용</th>
            <td>{board.boardContent}</td>
          </tr>

          <tr>
            <th className="btn-box" colSpan={2}>
              <button onClick={modifyBoard}>수정</button>
              <button onClick={deleteBoard}>삭제</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoardView;
