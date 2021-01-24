import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Container } from '../styles/pages/Home';

const Home: React.FC = () => {
    const [session, loading] = useSession();

    return (
        <Container>
            <Head>
                <title>Homepage</title>
            </Head>
            {!session ? (
                <>
                    Not signed in yet
                    <br />
                    <button onClick={() => signIn()}>Sign In</button>
                </>
            ) : (
                <>
                    Signed in as {session.user.email}
                    <div>Now you can access our super secret pages</div>
                    <button>
                        <Link href='/secret'>To the secre</Link>
                    </button>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </Container>
    );
};

export default Home;
