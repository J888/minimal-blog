type Props = {
  size: 'xxs' | 'xs' | 'sm' | 'm' | 'l';
};

const Spacer = ({ size }: Props) => {
  let height = 0.0;
  if (size === 'xxs') {
    height = 0.5;
  } else if (size === 'xs') {
    height = 1.0;
  } else if (size === 'sm') {
    height = 2.5;
  } else if (size === 'm') {
    height = 3.0;
  } else if (size === 'l') {
    height = 3.5;
  } else if (size === 'xl') {
    height = 4.0;
  } else if (size === 'xxl') {
    height = 4.5;
  }
  return (<div style={{height: `${height}rem`}}></div>)
}

export default Spacer;
