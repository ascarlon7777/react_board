package kr.or.iei.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.board.model.dao.BoardDao;
import kr.or.iei.board.model.dto.Board;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;

	
	public List selectBoardList() {
		List list = boardDao.selectBoardList();
		return list;
	}


	public Board selectOneBoard(int boardNo) {
		Board b = boardDao.selectOneBoard(boardNo);
		return b;
	}

	@Transactional
	public int insertBoard(Board b) {
		int result = boardDao.insertBoard(b);
		return result;
	}


	@Transactional
	public int deleteBoard(int boardNo) {
		int result = boardDao.deleteBoard(boardNo);
		return result;
	}

	@Transactional
	public int modifyBoard(Board b) {
		return boardDao.modifyBoard(b);
	}

}
