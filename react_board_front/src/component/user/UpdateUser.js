import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./updateUser.css";
import { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  const [userGrade, setUserGrade] = useState(user.userGrade);
  const changeGrade = (e) => {
    setUserGrade(e.target.value);
    console.log(userGrade);
  };

  const userNo = user.userNo;
  const update = () => {
    const obj = { userNo, userGrade };
    axios
      .patch("http://192.168.10.20:8888/user", obj)
      .then((res) => {
        if (res.data.message === "수정 성공") {
          navigate("/userInfo/" + userNo);
        } else {
          navigate("/userList");
        }
      })
      .catch((res) => {
        console.log(res);
      });
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
            <td>
              <input
                type="text"
                value={userGrade}
                onChange={changeGrade}
              ></input>
            </td>
          </tr>

          <tr>
            <th id="update-btn" colSpan={2}>
              <button onClick={update}>수정하기</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UpdateUser;
