package kr.or.iei.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.board.model.dto.Board;

@Mapper
public interface BoardDao {

	List selectBoardList();

	Board selectOneBoard(int boardNo);

	int insertBoard(Board b);

	int deleteBoard(int boardNo);

	int modifyBoard(Board b);


	
	
}
