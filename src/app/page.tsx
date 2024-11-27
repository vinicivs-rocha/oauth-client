import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Link
        href={
          "http://localhost:3000/user?projectId=9fdb9fc1-127a-43c2-ba38-89077ef1a0ce&scope=full&redirectUrl=http://localhost:3001/auth"
        }
        className="bg-slate-300 hover:bg-slate-400 active:bg-slate-200 p-3  rounded"
      >
        Entrar com Provedor
      </Link>
    </div>
  );
}
