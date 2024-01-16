import { FC, MouseEventHandler, ReactElement } from 'react';

interface HeartIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const HeartIcon: FC<HeartIconProps> = ({ onClick }): ReactElement => (
  <button onClick={onClick} className="fi fi-ts-circle-heart"></button>
);

export default HeartIcon;