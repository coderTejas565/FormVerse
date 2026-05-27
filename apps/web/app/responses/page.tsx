import { Suspense } from "react";
import ResponsesClient from "./ResponsesClient";

export default function ResponsesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResponsesClient />
    </Suspense>
  );
}