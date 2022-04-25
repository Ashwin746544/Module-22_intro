import classes from "./MeetupDetail.module.css";

function MeetupDetail({ image, title, description, address }) {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetail;
