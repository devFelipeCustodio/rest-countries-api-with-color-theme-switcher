const CountryPage = ({ params }: { params: {alphaCode: string} }) => {
    return <p>{params.alphaCode}</p>;
};

export default CountryPage;
