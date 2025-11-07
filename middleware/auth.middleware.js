const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing Bearer token" });
  }

  const token = authHeader.split(" ")[1];
  if (token !== "FSMovies2023") {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }

  next();
};
export default authenticate;