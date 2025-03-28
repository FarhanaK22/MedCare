
const pool = require("../../db/index.js")

const filterDoctors = async (req, res) => {
  const { rating, experience, gender , searchQuery = "", page = 1} = req.query;

  try {
    // Base query
    let query = "SELECT * FROM view_doctor WHERE 1=1";
    const queryParams = [];

    if (rating && rating !== "all") {
      queryParams.push(rating);
      query += ` AND avgrating  = $${queryParams.length}`;
    }

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
    const limit = 6;
    const offset = (page - 1) * limit;
    query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);
    console.log("Query Result:", result.rows);
    const doctors = result.rows
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const doctorID = async (req, res) => {
  console.log("inside doctor")
  const { doctor_id } = req.params;
  try {
    const query = "SELECT * FROM view_doctor WHERE doctor_id = $1";
    const values = [doctor_id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(result.rows[0]); 
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const availableSlots = async(req,res)=>
{
  console.log(req.user)
  if(req.isAuthenticated())
    res.send("access to give view")
  else
  res.redirect("http://localhost:3001/user/login")
}

const doctorAvailability = async(req,res)=>
{
  const { doctor_id } = req.params;
  try {
    // Query to get available slots for the doctor
    const query = `
      SELECT da.working_days, da.slot_start, da.slot_end
      FROM doctor_availability da
      WHERE da.doctor_id = $1
    `;
    const result = await pool.query(query, [doctor_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No available slots found for this doctor.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { filterDoctors  ,doctorID  , availableSlots ,doctorAvailability}