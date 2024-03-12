import { useEffect, useState } from "react";
import "./boardList.css";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardList = () => {
  console.log("들어오자 마자");
  const [boardList, setBoardList] = useState([]);
  // *** DB 데이터를 활용할 것이기에, 삭제 후 빈 배열 처리 ***
  // null값으로 처리시, map함수가 돌지 못해서 에러남.
  // 비동기 요청으로 데이터를 받아올 건데, 받아올 데이터의 형태로 초기값을 세팅
  // $.ajax는 $표시때문에 jquery여야만 사용가능

  //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
  //★★★ 이젠 axios를 통한 '비동기 요청'을 진행한다. 키야~~ ★★★
  // 이제 3000번 포트(front)에서 8888포트(server)로 요청
  //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
  //success, error

  /*
    $.ajax({
      url : 요청주소,
      type : 요청메소드,
      success: 성공함수,
      error : 에러함수
    })

    $.ajax({
        url: "http://192.168.10.34:8888/board/list",
        type: "get",
        success : () => {},  //success의 파라미터에서 데이터를 수신함
        error : () = {}
    })
    ->
    axios.메소드(주소).then(성공함수).catch(실패함수)
    */

  //useEffect => window.onload
  //두번째 매개변수에 있는 배열에 state를 넣어줄 것이다. -> 해당 state가 변경되면 useEffect가 다시 실행
  //두번째 매개변수에 있는 배열을 비워두면 최초 1번 실행 후 재실행x
  console.log("useEffect 전");
  useEffect(() => {
    console.log("useEffect 내부");
    axios
      .get("http://192.168.10.34:8888/board/list")
      .then((res) => {
        setBoardList(res.data); // 상태 업데이트
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("useEffect 후");
  /*
    {
      boardNo: 1,
      boardTitle: "제목1",
      boardContent: null,
      boardWriter: "유저1",
      boardDate: "2024-03-12",
    },
    {
      boardNo: 2,
      boardTitle: "제목2",
      boardContent: null,
      boardWriter: "유저1",
      boardDate: "2024-03-12",
    },
    {
      boardNo: 3,
      boardTitle: "제목3",
      boardContent: null,
      boardWriter: "유저2",
      boardDate: "2024-03-12",
    },
    */

  return (
    <div className="board-list-wrap">
      <h2 className="board-title">게시물 목록</h2>
      <div className="write-btn">
        <Link to="/boardInsert">글작성</Link>
      </div>
      <table className="board-tbl">
        <thead>
          <tr>
            <th width="10%">글번호</th>
            <th width="50%">제목</th>
            <th width="20%">작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {/* tbody에서 map함수를 써서 반복문돌리고, BoardItem 컴포넌트 사용*/}
          {boardList.map((board, index) => {
            return <BoardItem key={"board" + index} board={board} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const BoardItem = (props) => {
  const board = props.board;
  return (
    <tr>
      <td>{board.boardNo}</td>
      <td className="board-list-title">
        <Link to={"/boardView/" + board.boardNo}>{board.boardTitle}</Link>
      </td>
      <td>{board.boardWriter}</td>
      <td>{board.boardDate}</td>
    </tr>
  );
};

export default BoardList;
