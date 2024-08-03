import { json, useRouteLoaderData, useParams, redirect } from "react-router-dom"
import EventItem from "../components/EventItem";

export default function EventDetailPage(){
    const params = useParams();
    const data = useRouteLoaderData("event-detail");
    return(
        <EventItem event={data.event}/>
    )
}

export async function loader({request, params}){
    const response = await fetch("http://localhost:8080/events/"+params.eventId);
    if (!response.ok) {
      return json({ message: "Could not fetch details for selected event." }, { status: 500 });
    } else {
      return response;
    }
}

export async function action({request, params}){
  const response = await fetch("http://localhost:8080/events/"+params.eventId,
    {
      method:request.method
    }
  );
  if (!response.ok) {
    return json({ message: "Could not delete event." }, { status: 500 });
  } else {
    return redirect('/events');
  }
}