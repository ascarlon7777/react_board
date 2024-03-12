import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <div className="site-logo">
          <Link to="/">HomePageName</Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/boardList">게시판</Link>
            </li>
            <li>
              <Link to="/memberList">회원</Link>
            </li>
          </ul>
        </div>
        <div className="link-box">
          <Link to="/login">로그인</Link>
          <Link to="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
