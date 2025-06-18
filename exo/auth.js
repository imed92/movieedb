const user = { id: 1, name: "Alice", role: "admin" };

function generateToken(user) {
  const userString = JSON.stringify(user);
  const token = btoa(userString);
  return token;
}

const token = generateToken(user);
console.log("Token généré :", token); // eyJpZCI6MSwibmFtZSI6IkFsaWNlIiwicm9sZSI6ImFkbWluIn0=

function verifyToken(token) {
  const decodedToken = atob(token);
  const user = JSON.parse(decodedToken);
  return user;
}

const decodedUser = verifyToken(token);
console.log("Utilisateur décodé :", decodedUser); // { id: 1, name: "Alice", role: "admin" }
