export default function Series({ series }) {
  return <div>{series ? series : "Lots of Empty, huh?"}</div>;
}

export function getServerSideProps(context) {
  return { props: { series: context.query.series } };
}
