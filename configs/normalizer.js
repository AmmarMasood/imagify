export const modelPayloadNormalizer = (payload) => {
  const { data } = payload;
  const { attributes } = data;
  const { name, email } = attributes;

  return {
    name,
    email,
  };
};
