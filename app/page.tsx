import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={5} itemsCount={100} pageSize={10} />;
}
