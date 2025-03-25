const { response, json } = require("express");
const pool = require("../../db/index.js")

const doctorsData = async(req,res) =>
{
    try {
        const result = await pool.query("SELECT * FROM doctors" ,[]);
        console.log("query",result)
        res.send(JSON.stringify(result.rows))
        return {
            success : true,
            data : result.rows
        }
    }
    catch(err)
    {
        console.log("error" ,err)
        return {
            success : false,
            error : err ,
            
        }
    }
}
const calculateAverageRating = async (doctor_id) => {
  try {
    const query = `
      SELECT ROUND(AVG(rating)) AS average_rating
      FROM review
      WHERE doctor_id = $1
    `;
    const values = [doctor_id];
    const result = await pool.query(query, values);
    return result.rows[0].average_rating || 0;
  } catch (err) {
    console.error("Error calculating average rating:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

const filterDoctors = async (req, res) => {
  const { rating, experience, gender , searchQuery = "", page = 1} = req.query;

  try {
    // Base query
    let query = "SELECT * FROM doctors WHERE 1=1";
    const queryParams = [];

    // Add filters dynamically
    // if (rating && rating !== "all") {
    //   queryParams.push(rating);
    //   query += ` AND rating = $${queryParams.length}`;
    // }

    if (experience && experience !== "all") {
      const [minExp, maxExp] = experience.split("-").map(Number);
      queryParams.push(minExp, maxExp);
      query += ` AND experience BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
    }

    if (gender && gender !== "all") {
      queryParams.push(gender.toLowerCase());
      query += ` AND LOWER(gender) = $${queryParams.length}`;
    }
    if (searchQuery) {
      queryParams.push(`%${searchQuery.toLowerCase()}%`);
      query += ` AND (LOWER(name) LIKE $${queryParams.length} OR LOWER(speciality) LIKE $${queryParams.length})`;
    }

    // Pagination logic
    const limit = 6; // Number of records per page
    const offset = (page - 1) * limit;
    query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);
    // Execute the query
    const result = await pool.query(query, queryParams);
    // console.log("Query Result:", result.rows);
    const doctors = result.rows
    const data = []
     for (const doctor of doctors) {
      averageRating = await calculateAverageRating(doctor.doctor_id);
      doctor.average_rating = averageRating
    if (!rating || rating === "5" || averageRating == parseInt(rating)) {
      data.push(doctor);
    }    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const search_doctor = async (req, res) => {
  const { query } = req.params;
  try {
    const sqlQuery = `
      SELECT * FROM doctors
      WHERE LOWER(name) LIKE LOWER($1)
      OR LOWER(speciality) LIKE LOWER($1)
    `;
    const values = [`%${query}%`];
    const result = await pool.query(sqlQuery, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error searching for doctors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const doctorID = async (req, res) => {
  const { doctor_id } = req.params;
  try {
    const query = "SELECT * FROM doctors WHERE doctor_id = $1";
    const values = [doctor_id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const doctorData =result.rows[0];
    averageRating = await calculateAverageRating(doctorData.doctor_id);
    doctorData.average_rating = averageRating
    
    res.status(200).json(result.rows[0]); 
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {doctorsData , filterDoctors ,search_doctor ,doctorID}