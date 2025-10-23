export default function pollPage({params}){
    const slug = params.slug;
    return <h1>The poll's slug:{slug}</h1>;
}