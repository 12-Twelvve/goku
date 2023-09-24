import React, { createContext, useContext, useState } from 'react';

const BoardSizeContext = createContext();

export const useBoardSize = () => {
  return useContext(BoardSizeContext);
};

export const BoardSizeProvider = ({ children }) => {
  const [boardSize, setBoardSize] = useState(15);

  return (
    <BoardSizeContext.Provider value={{ boardSize, setBoardSize }}>
      {children}
    </BoardSizeContext.Provider>
  );
};
