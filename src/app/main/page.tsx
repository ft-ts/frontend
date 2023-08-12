import LeftWrapper from './left-wrapper/page';
import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import MyPage from '../../../pages/my-page';
import { UserInfoContainer, UserProps, MainProps} from './userType';
import './main.css';

export default function Main(props: MainProps) {

    return (
      <div id="main">
        { <LeftWrapper /> }
        { <MidWrapper /> }
        { <RightWrapper OneUser={props.OneUser} /> }
      </div>
    )
  }
