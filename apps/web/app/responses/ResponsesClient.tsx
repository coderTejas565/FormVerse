'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trpc } from "~/trpc/client";

export default function ResponsesClient() {
  const searchParams = useSearchParams();
  const targetFormId = searchParams.get("formId");

  const { data = [], isLoading } =
    trpc.form.getResponses.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const filteredResponses = data;

  const activeFormTitle =
    filteredResponses.length > 0
      ? filteredResponses[0]?.formTitle
      : null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between mb-8">

          <div>
            <Link href="/dashboard" className="text-sm text-gray-500">
              Dashboard
            </Link>

            <h1 className="text-3xl font-bold mt-2">
              {activeFormTitle ?? "Responses"}
            </h1>
          </div>

          {targetFormId && (
            <Link href="/responses" className="border px-4 py-2 rounded">
              Clear Filter
            </Link>
          )}
        </div>

        {!filteredResponses.length ? (
          <div>No responses found</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th>Form</th>
                <th>Submitted</th>
                <th>Answers</th>
              </tr>
            </thead>

            <tbody>
              {filteredResponses.map((response) => (
                <tr key={response.responseId}>
                  <td>{response.formTitle}</td>

                  <td>
                    {response.submittedAt
                      ? new Date(response.submittedAt).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    {response.answers.map((answer) => (
                      <div key={answer.fieldId}>
                        <strong>{answer.fieldId.slice(0, 6)}</strong> :{" "}
                        {answer.value}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}