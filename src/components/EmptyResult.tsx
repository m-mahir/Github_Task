type Props = {
  keyword: string;
};

export default function EmptyResult({ keyword }: Props) {
  let header = "",
    subtitle = "";
  if (keyword) {
    header = "No results found";
    subtitle = "We couldn't find what you searched for. Try searching again.";
  } else {
    header = "No data yet";
    subtitle = "Start exploring GitHub repositories.";
  }

  return (
    <div className="pt-5 h-100 text-center text-secondary">
      <h1 className="font-weight-bold">{header}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}
