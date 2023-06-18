import listStyles from "../../../styles/List.module.scss";
import LoaderCard from "./LoaderCard";

const Loader = () => {
  return (
    <div className={listStyles.wrapper}>
      <div className={listStyles.grid}>
        {[0, 1, 2, 4].map((i: number) => (
          <LoaderCard key={i} />
        ))}
      </div>
    </div>
  );
};
export default Loader;
