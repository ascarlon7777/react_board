package kr.or.iei.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.iei.board.model.dto.Board;
import kr.or.iei.board.model.service.BoardService;

@CrossOrigin("*") //요청 도메인이 다르더라도.  -> @CrossOrigin("http://") 특정 URL설정도 가능
@Controller
@RequestMapping(value="/board")
public class BoardController {
	 @Autowired
	 private BoardService boardService;
	 
	 @ResponseBody
	 @GetMapping(value="/list")
	 public List boardList() {
		 List list = boardService.selectBoardList();
		return list;
	 }
	 
	 
	 //파라미터를 쓰지 않고 데이터를 주고 받음
	 @ResponseBody
	 @GetMapping(value="/view/{boardNo}")
	 public Board boardView(@PathVariable int boardNo) { //경로에 있는 변수 가져오기
	     Board b = boardService.selectOneBoard(boardNo);
	     System.out.println("controller: " + b);
	     return b;
	 }
	 
	 @ResponseBody
	 @PostMapping(value="/insert")
	 //포스트로 요청하면 무조건 객체로 받아야 함.
	 public int insert(@RequestBody Board b) {
		 int result = boardService.insertBoard(b);
		 return result;
	 }
	 
	 @ResponseBody
	 @GetMapping(value="/delete/{boardNo}")
	 public int deleteBoard(@PathVariable int boardNo) {
		 int result = boardService.deleteBoard(boardNo);
		 return result;
	 }

	 
	 
}
