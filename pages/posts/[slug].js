import { Fragment } from "react";
import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/post-util";

const PostDetailPage = ({ post }) => {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { slug } = context.params;

  const post = getPostData(slug);

  return {
    props: { post },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default PostDetailPage;
