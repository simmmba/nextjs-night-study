export default async function Read({params}) {
    // console.log(params);
    const response = await fetch('http://localhost:9999/topics/'+params.id, {cache: 'no-store'})
    const topic = await response.json();
    return (
      <>
        <h2>{topic.title}</h2>
        {topic.body}
      </>
    )
  }
  