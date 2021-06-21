import './button.scss';

export function Button({label}) {
  return <button className="super-button">{label}</button>;
}

class Button extends React.Component {
function Button({label}) {
  return (
  <button>{label}</button>);
  }
}
