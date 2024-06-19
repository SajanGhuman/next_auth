import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "ADMIN") {
    return (
      <div>Admin Dashboard</div>
    );
  } else {
    return (
      <div>User Dashboard</div>
    );
  }
}

