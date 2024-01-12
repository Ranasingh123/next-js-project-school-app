import Link from "next/link";
import styles from "../styles/common.css";

export default function Home() {
  return (
    <main className="main">
      <div className="title">School Next.js Project</div>
      <div className={"link-container"}>
        <Link className="link" href="/addSchool">
          Add School
        </Link>
        <Link className="link" href="/showSchools">
          Show Schools
        </Link>
      </div>
    </main>
  );
}
