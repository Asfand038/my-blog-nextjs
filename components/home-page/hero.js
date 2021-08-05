import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/asfand.jpg"
          alt="An image showing Asfandyar"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Asfandyar</h1>
      <p>
        I blog about web development - escpecially frontend frameworks like
        React
      </p>
    </section>
  );
};

export default Hero;
