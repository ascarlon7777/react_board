import { useEffect, useState } from "react";
import "./userList.css";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  //useEffect => window.onload
  //두번째 매개변수에 있는 배열에 state를 넣어줄 것이다. -> 해당 state가 변경되면 useEffect가 다시 실행
  //두번째 매개변수에 있는 배열을 비워두면 최초 1번 실행 후 재실행x
  console.log("useEffect 전");
  useEffect(() => {
    console.log("useEffect 내부");
    axios
      .get("http://192.168.10.20:8888/user")
      .then((res) => {
        setUserList(res.data.data); // 데이터에 다른 데이터 붙여넣었으므로
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("useEffect 후");

  return (
    <div className="user-list-wrap">
      <h2 className="user-title">회원정보 출력</h2>
      <table className="user-tbl">
        <thead>
          <tr>
            <th width="10%">회원 번호</th>
            <th width="15%">회원 아이디</th>
            <th width="15%">회원 이름</th>
            <th width="10%">회원 성별</th>
            <th width="25%">회원 전화번호</th>
            <th width="15%">회원 등급</th>
            <th width="10%">회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* tbody에서 map함수를 써서 반복문돌리고, BoardItem 컴포넌트 사용*/}
          {userList.map((user, index) => {
            return <UserItem key={"user" + index} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const UserItem = (props) => {
  const user = props.user;
  return (
    <tr>
      <td>{user.userNo}</td>
      <td className="user-list-title">
        <Link to={"/userInfo/" + user.userNo}>{user.userId}</Link>
      </td>
      <td>{user.userName}</td>
      <td>{user.userGender}</td>
      <td>{user.userPhone}</td>
      <td>{user.userGrade}</td>
      <td>
        <button>삭제</button>
      </td>
    </tr>
  );
};

export default UserList;
