import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./users";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <LoginButton/>
      <LogoutButton/>
      <h2>Sever Session</h2>
      <div>{JSON.stringify(session)}</div>
      <div>Client Call</div>
      <User/>
    </main>
  );
}
