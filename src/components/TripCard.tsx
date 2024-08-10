import { Card, CardContent, Typography } from "@mui/material";

interface TripCardProps {
  day: string;
  time: string;
  name: string;
  address: string;
  onClick: () => void;
}

const TripCard = ({ day, time, name, address, onClick }: TripCardProps) => {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = "scale(1.03)";
        target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = "scale(1)";
        target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      <CardContent>
        <Typography variant="body1">{time}</Typography>
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          {name}
        </Typography>
        <Typography variant="body2">{address}</Typography>
      </CardContent>
    </Card>
  );
};

export default TripCard;
