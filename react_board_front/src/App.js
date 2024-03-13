import { Routes, Route } from "react-router-dom"; // Routes와 Route를 import합니다.
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import Main from "./component/common/Main";
import BoardList from "./component/board/BoardList";
import BoardView from "./component/board/BoardView";
import BoardWrite from "./component/board/BoardWrite";
import BoardModify from "./component/board/BoardModify";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/boardList" element={<BoardList />} />
          <Route path="/boardView/:boardNo" element={<BoardView />} />
          <Route path="/boardInsert" element={<BoardWrite />} />
          <Route path="/boardModify" element={<BoardModify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
