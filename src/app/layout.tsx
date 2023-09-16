import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Nunito_Sans } from 'next/font/google';

import './global.scss';

import ThemeContextProvider from './context/ThemeContext';
import MainHeader from './components/MainHeader';

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: 'variable' });

export const metadata: Metadata = {
    title: 'Frontend Mentor | REST Countries API with color theme switcher',
};

type Themes = 'light' | 'dark';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
    theme: Themes;
}) {
    const theme = cookies().get('theme')?.value;
    return (
        <html
            lang="en"
            className={theme || 'light'}
        >
            <body className={nunitoSans.className}>
                <ThemeContextProvider>
                    <MainHeader />
                    <div>{children}</div>
                </ThemeContextProvider>
            </body>
        </html>
    );
}
