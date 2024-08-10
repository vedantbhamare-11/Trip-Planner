import { useState } from "react";
import { Container, Box } from "@mui/material";
import TripForm from "../components/TripForm";
import "../app/globals.css";
const Home = () => {
  const [itinerary, setItinerary] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setItinerary(data.itinerary);
  };

  return (
    <Container
      maxWidth={false}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        position: "relative",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <TripForm onSubmit={handleFormSubmit} />
      </Box>
    </Container>
  );
};

export default Home;
