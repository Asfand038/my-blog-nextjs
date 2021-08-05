import { Fragment } from "react";
import Head from "next/head";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-util";

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Asfand&apos;s Blog</title>
        <meta
          name="description"
          content="I post about javascript frontend frameworks particularly reactjs"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
  };
}

export default HomePage;
