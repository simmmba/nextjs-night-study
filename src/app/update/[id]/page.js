'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update({params}) {
  // Router 만들기(useRouter 훅 사용)
  const router = useRouter();
  const id = params.id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // console.log('id', id);

  async function refresh(){
    const res = await fetch(`http://localhost:9999/topics/${id}`, {
      cache: 'no-store'
    });
    const topic = await res.json();
    setTitle(topic.title);
    setBody(topic.body);
    // console.log('topic', topic);
  }

  useEffect(()=>{ // component 외적인 작업 할때 사용, async 직접 사용 불가
    refresh();
    // console.log('use effect');
  }, [id]); // id에 해당하는 데이터 바뀔때 함수 실행

  return (
    <form onSubmit={async e=>{
      e.preventDefault(); // submit 버튼 클릭시 페이지 reload 막음
      const title = e.target.title.value; // e는 폼태그의 태그 가리킴
      const body = e.target.body.value;
      // console.log(title, body);

      const res = await fetch('http://localhost:9999/topics/'+id, {
        method: 'PATCH', // 원하는 데이터만 바꾸기 (PUT은 모든 데이터 바꿈)
        body: JSON.stringify({title, body}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const topic = await res.json();
      // console.log(topic);
      // 사용자를 /read/[id]로 이동시키기
      const lastId = topic.id;
      const url = `/read/${lastId}`;
      router.push(url);
      router.refresh(); // 서버 컴포넌트 refresh
    }}>

      <h2>Update</h2>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={e=>{
        setTitle(e.target.value);
      }} /></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={e=>{
        setBody(e.target.value);
      }}></textarea></p>
      <p><input type="submit" value="update" /></p>
    </form>
  )
}
