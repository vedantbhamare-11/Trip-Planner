import type { NextApiRequest, NextApiResponse } from "next";

const tripHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { tripDuration, tripDestination, tripStyle } = req.body;

    const tripPlan = {
      destination: tripDestination,
      duration: tripDuration,
      style: tripStyle,
      activities: ["Sightseeing", "Adventure", "Relaxation"],
    };

    res.status(200).json(tripPlan);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default tripHandler;
