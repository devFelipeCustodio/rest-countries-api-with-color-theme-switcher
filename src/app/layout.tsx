import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';

import './global.scss';

import { Providers } from './providers';
import MainHeader from './components/MainHeader';

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: 'variable' });

export const metadata: Metadata = {
    title: {
        template:
            '%s | Frontend Mentor | REST Countries API with color theme switcher',
        default:
            'Frontend Mentor | REST Countries API with color theme switcher', // a default is required when creating a template
    },
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={nunitoSans.className}>
                <Providers>
                    <MainHeader />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
