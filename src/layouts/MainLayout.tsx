import { css } from '@emotion/react';
import Board from './sections/Board';
import Title from './sections/Title';
import ToolBar from './sections/ToolBar';

const style = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .content {
    display: flex;
    align-items: stretch;
    flex: 1;
  }
`;

function MainLayout() {
  return (
    <main css={style}>
      <Title />
      <div className="content">
        <ToolBar />
        <Board />
      </div>
    </main>
  );
}

export default MainLayout;
