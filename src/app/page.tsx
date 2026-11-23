import { HomePage } from "@/components/HomePage";

export default function Home() {
  // Rok do pätičky – zistí sa pri builde, aby sa server a prehliadač zhodli.
  return <HomePage year={new Date().getFullYear()} />;
}
