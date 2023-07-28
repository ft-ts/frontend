import LeftWrapper from './left-wrapper/page';
import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import './main.css';

export default function Main() {
  return (
    <div id="main">
      <LeftWrapper />
      <MidWrapper />
      <RightWrapper />
    </div>
  )
}
