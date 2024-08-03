import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventsNavigation from "./components/EventsNavigation";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import { action as CreateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsNavigation />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDeleteAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: CreateEventAction,
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: CreateEventAction },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
