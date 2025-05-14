import { TestClient } from "./Test";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full items-center pt-10 gap-8">
      <h1 className="text-xl font-bold">Dactylotest</h1>
      <TestClient />
    </div>
  );
}
