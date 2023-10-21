import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';

import './global.scss';

import { Providers } from './providers';

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: 'variable' });

export const metadata: Metadata = {
    title: 'Frontend Mentor | REST Countries API with color theme switcher',
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
                    {children}
                </Providers>
            </body>
        </html>
    );
}
