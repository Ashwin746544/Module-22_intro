import MeetupList from "../components/meetups/MeetupList";
import { Fragment, useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_LIST = [
  {
    id: "m1",
    title: "The first Meetup",
    description: "This is a first Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1200px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
    address: "some city 5,some area 8573",
  },
  {
    id: "m2",
    title: "The second Meetup",
    description: "This is a second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1200px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
    address: "some city 10,some area 574593",
  },
];
function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(() => {
  //     setLoadedMeetups(DUMMY_LIST);
  //   }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a Huge List Of active meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// static site generation   SSG
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://ahpatel9:ahpatel9@cluster0.ar3og.mongodb.net/NextJsDb?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //Incremental site generation  ISR
  };
}

// Server Side Rendering   SSR
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_LIST,
//     },
//   };
// }

export default HomePage;
