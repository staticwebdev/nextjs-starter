import React from 'react';
import Link from 'next/link';

export default function SmallCard({ Icon, title, slug }) {
  return (
    <Link
      href={`/project/${slug}`} >
      <a
        className="card-small" >
        <Icon w={153} h={163} />
        <h3>{title}</h3>
      </a>
    </Link>
  );
}
