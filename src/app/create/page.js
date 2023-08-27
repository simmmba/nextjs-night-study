'use client';
import { useRouter } from 'next/navigation';

export default function Create() {
  // Router 만들기(useRouter 훅 사용)
  const router = useRouter();

  return (
    <form onSubmit={async e=>{
      e.preventDefault(); // submit 버튼 클릭시 페이지 reload 막음
      const title = e.target.title.value; // e는 폼태그의 태그 가리킴
      const body = e.target.body.value;
      // console.log(title, body);

      const res = await fetch('http://localhost:9999/topics', {
        method: 'POST',
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

      <h2>Create</h2>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="create" /></p>
    </form>
  )
}
