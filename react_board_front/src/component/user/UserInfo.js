import { useParams } from "react-router-dom";
import "./userInfo.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const params = useParams();
  const userNo = params.userNo;
  //hook은 항상 컴포넌트 중괄호 레벨에서 만들어야 함
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://192.168.10.20:8888/user/" + userNo)
      .then((res) => {
        if (res.data.message === "조회 성공") {
          setUser(res.data.data);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const deleteUser = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete("http://192.168.10.20:8888/user/" + userNo)
        .then((res) => {
          if (res.data.message === "삭제 성공") {
            navigate("/userList");
          } else {
            alert("문제발생 빨리찾아");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateUser = () => {
    navigate("/updateUser", { state: { user: user } });
  };

  return (
    <div className="user-info-wrap">
      <table className="user-info-tbl">
        <thead>
          <tr className="user-info-title">
            <th colSpan={2}>회원정보 보기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th width="20%">회원 번호</th>
            <td width="80%">{user.userNo}</td>
          </tr>
          <tr>
            <th>회원 아이디</th>
            <td>{user.userId}</td>
          </tr>
          <tr>
            <th>회원 이름</th>
            <td>{user.userName}</td>
          </tr>
          <tr>
            <th>회원 성별</th>
            <td>{user.userGender}</td>
          </tr>
          <tr>
            <th>회원 전화번호</th>
            <td>{user.userPhone}</td>
          </tr>
          <tr>
            <th>회원 등급</th>
            <td>{user.userGrade}</td>
          </tr>

          <tr>
            <th className="btn-box" colSpan={2}>
              <button onClick={updateUser}>수정</button>
              <button onClick={deleteUser}>삭제</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
