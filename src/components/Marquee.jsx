import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data = await res.json();
  const filteredHeading = data.filter((eachHeading) => eachHeading.change.pct > 0 || eachHeading.change.pct < 0);
  // console.log(filteredHeading);
  return (
    <div className="py-2">
      <MarqueeText direction="right" duration={12} pauseOnHover={true}>
        {filteredHeading.map((heading) => (
          <span className="px-4" key={heading.id}>
            <span>{heading.image} </span>
            <span>{heading.nameBn}</span>
            <span>{` ${Number(heading.today).toLocaleString("bn-BD")} টাকা/${heading.unit === "kg" ? "কেজি" : "লিটার"}`}</span>
            <span
              className={
                heading.change.dir === "up"
                  ? "text-red-500"
                  : heading.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }
            >
              {heading.change.dir === "up"
                ? " ▲"
                : heading.change.dir === "down"
                  ? " ▼"
                  : " —"}
              {Math.abs(heading.change.pct).toLocaleString("bn-BD")}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
