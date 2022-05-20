import { css } from '@emotion/react';
import { useCallback } from 'react';
import { ToolMode, useLabelingStore } from '@/store';

type Props = {
  name: ToolMode;
  alt?: string;
  icon?: string;
};

const style = css`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;

  &.active {
    background: #d5d9e2;
  }
`;

export default function ToolBarItem({ alt, name, icon }: Props) {
  const mode = useLabelingStore((s) => s.mode);
  const changeMode = useLabelingStore((s) => s.changeMode);

  const handleClick = useCallback(() => {
    changeMode(name);
  }, [changeMode, name]);

  return (
    <button
      css={style}
      className={mode === name ? 'active' : ''}
      onClick={handleClick}
    >
      <img src={icon} alt={alt} />
    </button>
  );
}
