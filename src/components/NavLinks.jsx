import CategoryLink from "./CategoryLink";

const NavLinks = async () => {
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/categories"
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data = await res.json();

  return (
    <>
      {data.map((category) => (
        <CategoryLink
          key={category.id}
          category={category}
        />
      ))}
    </>
  );
};

export default NavLinks;