import MainHeader from "../components/MainHeader";

export default function CountriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MainHeader />
            {children}
        </>
    );
}
