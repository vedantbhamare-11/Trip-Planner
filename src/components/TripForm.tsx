import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Autocomplete,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  fetchPlacePredictions,
  fetchPlacesByCategory,
} from "../services/placesService";
import TripCard from "./TripCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Place {
  name: string;
  address: string;
  category: string;
  coordinates: [number, number];
}

interface TimetableItem {
  place: Place;
  time: string;
}

interface DayItinerary {
  day: string;
  itinerary: TimetableItem[];
}

interface TripFormProps {
  onSubmit: (data: any) => void;
}

const UNSPLASH_API_KEY = "BaAOs9PVix8v5rM2UGTPXStxfQFMqoyT2T2wm5ARVJs";

const TripForm = ({ onSubmit }: TripFormProps) => {
  const [tripDuration, setTripDuration] = useState<string>("");
  const [tripDestination, setTripDestination] = useState<string>("");
  const [tripStyle, setTripStyle] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const [itinerary, setItinerary] = useState<DayItinerary[]>([]);
  const [showHotelButton, setShowHotelButton] = useState<boolean>(false);
  const [recommendedDestinations, setRecommendedDestinations] = useState<any[]>(
    []
  );
  const itineraryRef = useRef<HTMLDivElement>(null);

  const createTimetable = (places: Place[], days: number): DayItinerary[] => {
    const slotsPerDay = 4;
    const hoursPerSlot = 3;
    const timetable: DayItinerary[] = [];

    for (let day = 0; day < days; day++) {
      const dayItinerary: TimetableItem[] = [];
      for (let slot = 0; slot < slotsPerDay; slot++) {
        const index = day * slotsPerDay + slot;
        if (index < places.length) {
          const startTime = 9 + slot * hoursPerSlot;
          const endTime = startTime + hoursPerSlot;
          dayItinerary.push({
            place: places[index],
            time: `${startTime}:00 - ${endTime}:00`,
          });
        }
      }
      timetable.push({
        day: `Day ${day + 1}`,
        itinerary: dayItinerary,
      });
    }
    return timetable;
  };

  const fetchRecommendedDestinations = async () => {
    const cities = [
      "Paris",
      "Tokyo",
      "New York",
      "Sydney",
      "London",
      "Prague",
      "Istanbul",
      "Amsterdam",
    ];

    const shuffledCities = cities.sort(() => 0.5 - Math.random());

    const selectedCities = shuffledCities.slice(0, 4);

    const destinations = await Promise.all(
      selectedCities.map(async (city) => {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}`
        );
        const data = await response.json();
        const imageUrl =
          data.results[0]?.urls?.regular || "https://via.placeholder.com/300";
        return { name: city, imageUrl };
      })
    );

    setRecommendedDestinations(destinations);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const categoriesMap: { [key: string]: string } = {
      Relaxation: "leisure",
      "Cultural and Historical": "heritage",
      "Romantic for Couples": "tourism",
      "Family-Friendly": "heritage",
      "Adventure and Outdoor": "natural",
    };

    const selectedCategory = categoriesMap[tripStyle];
    if (selectedCategory) {
      try {
        const places = await fetchPlacesByCategory(
          tripDestination,
          selectedCategory
        );

        const durationDays = parseInt(tripDuration.split(" ")[0]);
        const itinerary = createTimetable(places, durationDays);
        setItinerary(itinerary);
        setShowHotelButton(true);
        onSubmit({
          destination: tripDestination,
          duration: tripDuration,
          style: tripStyle,
          itinerary,
        });
        fetchRecommendedDestinations();
      } catch (error) {
        console.error("Error generating itinerary:", error);
      }
    } else {
      console.warn("Invalid trip style selected");
    }
  };

  const handleInputChange = async (event: ChangeEvent<{}>, value: string) => {
    if (value.length > 2) {
      const suggestions = await fetchPlacePredictions(value);
      setOptions(suggestions);
    }
  };

  const durationOptions = Array.from({ length: 7 }, (_, i) => i + 1);
  const styleOptions = [
    "Relaxation",
    "Cultural and Historical",
    "Romantic for Couples",
    "Family-Friendly",
    "Adventure and Outdoor",
  ];

  const generatePDF = () => {
    if (itineraryRef.current) {
      html2canvas(itineraryRef.current, { scale: 6 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const leftMargin = 15;
        const imgWidth = 250 - leftMargin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdfHeight = pdf.internal.pageSize.height;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", leftMargin, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(
            imgData,
            "PNG",
            leftMargin,
            position,
            imgWidth,
            imgHeight
          );
          heightLeft -= pdfHeight;
        }

        pdf.save("itinerary.pdf");
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Discover Your Perfect Trip!
      </Typography>
      <Typography variant="h6" gutterBottom color="textSecondary">
        An unforgettable adventure tailored just for you.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Trip Duration"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              helperText="Select the duration of your trip"
              InputProps={{
                style: {
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                },
              }}
              variant="outlined"
            >
              {durationOptions.map((i) => (
                <MenuItem key={i} value={`${i} day${i > 1 ? "s" : ""}`}>
                  {`${i} day${i > 1 ? "s" : ""}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              freeSolo
              options={options}
              getOptionLabel={(option) => option.label}
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Trip Destination"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                    },
                  }}
                />
              )}
              onChange={(event, value) =>
                setTripDestination(value ? value.label : "")
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Trip Style"
              value={tripStyle}
              onChange={(e) => setTripStyle(e.target.value)}
              helperText="Select the style of your trip"
              InputProps={{
                style: {
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                },
              }}
              variant="outlined"
            >
              {styleOptions.map((style) => (
                <MenuItem key={style} value={style}>
                  {style}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "12px", padding: "10px 20px" }}
            >
              Generate Trip Plan
            </Button>
          </Grid>
        </Grid>
      </form>

      {itinerary.length > 0 && (
        <div style={{ marginTop: "20px" }} ref={itineraryRef}>
          <Typography variant="h5" gutterBottom>
            Your Itinerary
          </Typography>
          {itinerary && (
            <div style={{ marginTop: "20px", width: "100%" }}>
              {itinerary.map((dayPlan: any, index: number) => (
                <div key={index} style={{ marginBottom: "40px" }}>
                  <Typography variant="h5" gutterBottom>
                    {dayPlan.day}
                  </Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {dayPlan.itinerary.map((item: any, idx: number) => (
                      <TripCard
                        key={idx}
                        time={item.time}
                        name={item.place.name}
                        address={item.place.address}
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              item.place.address
                            )}`,
                            "_blank"
                          )
                        }
                        day={""}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {showHotelButton && (
            <Button
              variant="contained"
              color="secondary"
              style={{
                borderRadius: "12px",
                margin: "20px",
                padding: "10px 20px",
              }}
              onClick={() =>
                window.open(`https://www.makemytrip.com/hotels`, "_blank")
              }
            >
              Book Hotels
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: "12px",
              margin: "20px",
              padding: "10px 20px",
            }}
            onClick={generatePDF}
          >
            Download Itinerary as PDF
          </Button>
        </div>
      )}

      {/* Display recommended destinations only if itinerary exists */}
      {itinerary.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <Typography variant="h5" gutterBottom>
            Recommended Destinations
          </Typography>
          <Grid container spacing={2}>
            {recommendedDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={destination.name}
                    height="140"
                    image={destination.imageUrl}
                    title={destination.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {destination.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            destination.name
                          )}`,
                          "_blank"
                        )
                      }
                      style={{ borderRadius: "12px" }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default TripForm;
