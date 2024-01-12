import { query } from "../lib/db";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/common.css";

const ShowSchools = ({ schools }) => {
  return (
    <main className="main">
      <div className="title">Schools List</div>
      <div className="school-list page-content">
        {schools.map((school) => (
          <div key={school.id} className="school-card">
            <Image
              src={"/" + school.image}
              alt={school.name}
              width={300}
              height={300}
            />
            <div className="school-info">
              <h3>{school.name}</h3>
              <p>{school.address}</p>
              <p>{school.email}</p>
              <p>{school.contact}</p>
              <p>
                {school.city}, {school.state}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link className="link" href="/">
        Go Back
      </Link>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const schools = await query("SELECT * FROM public.schools");
    return {
      props: {
        schools: JSON.parse(JSON.stringify(schools.rows)), // Ensure serialization
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        schools: [], // Provide a default value or handle the error accordingly
      },
    };
  }
}

export default ShowSchools;
