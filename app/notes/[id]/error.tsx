"use client";

type Props = {
  error: Error;
};

const FetchIdError = ({ error }: Props) => {
  return <p>Could not fetch note {error.message}</p>;
};

export default FetchIdError;
