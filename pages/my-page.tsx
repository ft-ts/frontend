import Main from '../src/app/main/page';
import { GetStaticProps } from 'next';
import { UserInfoContainer, MainProps } from '../src/app/main/userType';

export default function MyPage(props: MainProps) {
    return <Main OneUser={props.OneUser} />;
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
    const res = await fetch('http://127.0.0.1:10000/api/users/all'); // Added 'http://' prefix
    const data: UserInfoContainer = await res.json();

    console.log(data); // You were missing the data to log

    return {
      props: { OneUser: data.OneUser },
    };
};
