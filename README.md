# Trip Planner

**Trip Planner** is a web application designed to help users plan their trips by suggesting customized itineraries based on their preferences. The app provides recommendations for various destinations, allowing users to generate detailed travel plans that include places to visit, timings, and more.

## Features

- **Customized Itineraries**: Generate trip itineraries based on user inputs such as trip duration, destination, and style.
- **Place Categories**: Fetch recommendations from categories like entertainment, natural, leisure, tourism, beach, and heritage.
- **Detailed Timetables**: View daily schedules with 4-5 places to visit, including timings from 9 AM to 9 PM.
- **Interactive UI**: Cards for each place with clickable links to Google Maps. Drag-and-drop functionality to reorder itinerary cards and a delete option to remove places.
- **Hotel Booking Integration**: Directly book hotels via MakeMyTrip or Booking.com.
- **Dynamic Heading**: Display a dynamic heading based on trip details and an image from Unsplash related to the trip destination.
- **Print/PDF Option**: Generate a printable or PDF version of the itinerary.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Material UI
- **Backend**: Geoapify Places API
- **Development Tools**: Git, VSCode

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vedantbhamare-11/Trip-Planner.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Trip-Planner
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   
   Create a `.env.local` file in the root directory and add your Geoapify API key:

   ```
   GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Enter your trip details, including duration, destination, and style.
2. Click "Generate" to create your itinerary.
3. Review and interact with the itinerary cards to view details, reorder, or delete places.
4. Use the "Book Hotels" button to find and book hotels in the destination city.
5. Export your itinerary as a printable PDF if needed.

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -am 'Add new feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Geoapify](https://www.geoapify.com/) for providing the Places API.
- [Material UI](https://mui.com/) for the UI components.
- [Unsplash](https://unsplash.com/) for trip-related images.
