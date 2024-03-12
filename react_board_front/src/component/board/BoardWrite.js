import "./boardWrite.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardWriter, setBoardWriter] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const navigate = useNavigate();
  const changeContent = (e) => {
    setBoardContent(e.target.value);
  };

  const registBoard = () => {
    //axios post방식으로 요청을 보낼때는 항상 객체타입으로 데이터를 묶어야 함
    if (boardTitle !== "" && boardContent !== "" && boardWriter !== "") {
      const obj = { boardTitle, boardContent, boardWriter }; //같은 키값으로 만들어 줌
      axios
        .post("http://192.168.10.34:8888/board/insert", obj)
        .then((res) => {
          if (res.data === 1) {
            navigate("/boardList");
          } else {
            alert("문제발생 빨리찾아");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert("입력값을 확인하세요");
    }
  };

  return (
    <div className="board-write-wrap">
      <h2 className="board-write-title">게시글 작성</h2>
      <div className="regist-wrap">
        <div className="input-wrap">
          <label htmlFor="boardTitle">제목</label>
          <InputComponent
            type="text"
            id="boardTitle"
            data={boardTitle}
            setData={setBoardTitle}
          />
        </div>

        <div className="input-wrap">
          <label htmlFor="boardWriter">작성자</label>
          <InputComponent
            type="text"
            id="boardWriter"
            data={boardWriter}
            setData={setBoardWriter}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            value={boardContent}
            onChange={changeContent}
          ></textarea>
        </div>
        <div className="input-wrap">
          <button id="regist-btn" onClick={registBoard}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

//input 컴포넌트 화
const InputComponent = (props) => {
  const type = props.type;
  const id = props.id;
  const data = props.data;
  const setData = props.setData;
  const changeValue = (e) => {
    setData(e.target.value);
  };
  return <input type={type} id={id} value={data} onChange={changeValue} />;
};

export default BoardWrite;
