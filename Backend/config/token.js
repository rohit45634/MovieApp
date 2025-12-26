import jwt from "jsonwebtoken";
const genToken = (userId, role) => {
  try {
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
export default genToken;
