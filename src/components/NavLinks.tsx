import CategoryLink from "./CategoryLink";

interface Idata{
    id: number;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data:Idata[] = await res.json();

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