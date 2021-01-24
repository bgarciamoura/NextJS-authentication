import { NextApiHandler } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils';

const options: InitOptions = {
    providers: [
        Providers.Credentials({
            name: 'Login form',
            credentials: {
                username: { label: 'Usuário', type: 'text', placeholder: 'bgarciamoura' },
                password: { label: 'Senha', type: 'password' },
            },
            authorize: async (credentials) => {
                /**
                 * Função para validar o acesso, pode ser utilizando o banco de dados
                 * ou alguma outra maneira, tudo para verificar se o e-mail esta correto
                 * se existe o usuário e tudo mais
                 */

                const user = { id: 1, name: 'Bruno', email: credentials.username };
                console.log(credentials);
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.reject(new Error('Você não conseguiu logar'));
                }
            },
        }),
        Providers.GitHub({
            clientId: process.env.NEXTAUTH_GITHUB_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
        }),
        Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        }),
        Providers.Auth0({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN,
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    database: {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
    },
    session: {
        jwt: true,
        // Em segundos
        maxAge: 120,
        updateAge: 0,
    },
    callbacks: {
        /**
         * Lidar com redirecionamento após realizar o login
         */
        redirect: async (url, _baseUrl) => {
            if (url === '/api/auth/signin') {
                return Promise.resolve('/secret');
            }
            return Promise.resolve('/api/auth/signin');
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
};

const nextAuthHandler = (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);

export default nextAuthHandler;
