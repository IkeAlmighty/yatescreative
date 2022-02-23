export default function EventTile({ event }) {
  return (
    <div>
      <h3>{event.title}</h3>
      {event.text}
    </div>
  );
}
