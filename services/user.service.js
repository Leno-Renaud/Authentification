import bcrypt from "bcrypt"

export async function registerUser(server, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  await server.pg.query(
    "INSERT INTO users (username, password) VALUES ($1,$2)",
    [username, hashedPassword]
  )
}

export async function loginUser(username, password, jwt, pg) {
  const res = await pg.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (!res.rows.length) throw new Error("User not found");

  const match = await bcrypt.compare(password, res.rows[0].password);
  if (!match) throw new Error("Invalid credentials");

  return jwt.sign({ username: res.rows[0].username });
}