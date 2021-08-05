import { Fragment } from "react";
import Head from "next/head";

import ContactForm from "../components/contact/contact-form";

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your valuable messages!" />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
