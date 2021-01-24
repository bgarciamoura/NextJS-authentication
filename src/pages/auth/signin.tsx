import React, { useEffect } from 'react';
import { csrfToken, getProviders, signIn } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Container } from '../../styles/pages/Home';

interface SignInProvider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
}

export default function SignIn({ providers, csrfToken }) {
    return (
        <Container>
            {Object.values(providers).map((provider: SignInProvider) => {
                if (provider.id === 'credentials') {
                    return (
                        <form method='post' action='/api/auth/callback/credentials' key={provider.id}>
                            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                            <label>
                                Usuário
                                <input name='username' type='text' />
                            </label>
                            <label>
                                Password
                                <input name='password' type='text' />
                            </label>
                            <button type='submit'>Sign in</button>
                        </form>
                    );
                } else if (provider.id === 'email') {
                    return (
                        <form method='post' action='/api/auth/signin/email' key={provider.id}>
                            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                            <label>
                                Email address
                                <input type='text' id='email' name='email' />
                            </label>
                            <button type='submit'>Sign in with Email</button>
                        </form>
                    );
                } else {
                    return (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                        </div>
                    );
                }
            })}
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const providers = await getProviders();
    return {
        props: {
            providers,
            csrfToken: await csrfToken(context),
        },
    };
};
