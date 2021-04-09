import PageApp from "modules/repository";

export default function Page({ user }) {
  return <PageApp {...{ user }} />;
}
