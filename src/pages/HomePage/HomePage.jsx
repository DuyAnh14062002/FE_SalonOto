import Navbar from "../../components/Navbar";

export default function HomePage() {
  const user = {
    displayName: "John Doe",
    image: "https://via.placeholder.com/150",
  };
  return <Navbar user={user} />;
}
