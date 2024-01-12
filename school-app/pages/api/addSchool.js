import { query } from "../../lib/db";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(fields);

    // Validate fields (add more validation if needed)

    // Move the uploaded file to the destination folder
    const oldPath = files.image[0].path;
    const newPath = path.join(
      process.cwd(),
      "public",
      "schoolImages",
      files.image[0].originalFilename
    );
    fs.renameSync(oldPath, newPath);

    // Insert data into the PostgreSQL database
    try {
      const dbResult = await query(
        "INSERT INTO schools (name, email, city, state, contact, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          fields.name[0],
          fields.email[0],
          fields.city[0],
          fields.state[0],
          fields.contact[0],
          "schoolImages/" + files.image[0].originalFilename,
        ]
      );

      res.status(200).json({
        message: "School added successfully",
        school: dbResult.rows[0],
      });
    } catch (dbError) {
      console.error("Database Error:", dbError);
      res.status(500).json({ error: "Failed to add school to the database" });
    }
  });
}
