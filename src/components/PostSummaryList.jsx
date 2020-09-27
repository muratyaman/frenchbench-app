import React from 'react';
import { PostSummary } from './PostSummary';

export function PostSummaryList({ posts = []}) {
  if (posts && posts.length) {
    return posts.map((post, idx) => (
      <PostSummary key={`${post.title}-${idx}`} {...post} />
    ))
  }
  return (
    <div>no posts found</div>
  )
}
