export default function handler(req, res) {
  if (req.method !== "POST")
    res.status(401).json({error: "/uploadimage only takes post requests"});
}
