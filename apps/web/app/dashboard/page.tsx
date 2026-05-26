"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";
import ResponsesChart from "~/components/ResponsesChart";

export default function DashboardPage() {
  const router = useRouter();

  const utils = trpc.useUtils();

  const {
    data: forms,
    isLoading: formsLoading,
    error: formsError,
  } = trpc.form.getMyForms.useQuery();

  const analytics = trpc.form.analytics.useQuery();

  const publish = trpc.form.publishForm.useMutation({
    onSuccess() {
      utils.form.getMyForms.invalidate();

      utils.form.analytics.invalidate();
    },
  });

  const unpublish = trpc.form.unpublishForm.useMutation({
    onSuccess() {
      utils.form.getMyForms.invalidate();

      utils.form.analytics.invalidate();
    },
  });

  useEffect(() => {
    if (formsError || analytics.error) {
      router.push("/sign-in");
    }
  }, [formsError, analytics.error, router]);

  if (formsLoading || analytics.isLoading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      p-8
      space-y-10
    "
    >
      {/* HEADER */}

      <div
        className="
        flex
        justify-between
        items-center
      "
      >
        <div>
          <h1
            className="
            text-4xl
            font-bold
          "
          >
            Dashboard
          </h1>

          <p
            className="
            text-slate-500
            mt-2
          "
          >
            Manage forms, responses and analytics
          </p>
        </div>

        <Link
          href="/create-form"
          className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
        "
        >
          + Create Form
        </Link>
      </div>

      {/* STATS */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >
        <div className="bg-white border rounded-2xl p-6">
          <p>Total Forms</p>

          <h2
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            {analytics.data?.totalForms}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p>Total Responses</p>

          <h2
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            {analytics.data?.totalResponses}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p>Recent Forms</p>

          <h2
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            {analytics.data?.recentForms?.length ?? 0}
          </h2>
        </div>
      </div>

      {/* CHART */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-8
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          Responses Over Time
        </h2>

        <ResponsesChart data={analytics.data?.responsesOverTime ?? []} />
      </div>

      {/* FORMS */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-8
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-8
        "
        >
          My Forms
        </h2>

        <div
          className="
          grid
          gap-4
        "
        >
          {forms?.map((form) => (
            <div
              key={form.id}
              className="
                  border
                  rounded-xl
                  p-5
                  bg-slate-50
                  hover:shadow-md
                  transition
                "
            >
              <div
                className="
                    flex
                    justify-between
                    items-start
                  "
              >
                <div>
                  <Link href={`/form/${form.id}/builder`}>
                    <h3
                      className="
                          text-lg
                          font-semibold
                          hover:underline
                        "
                    >
                      {form.title}
                    </h3>
                  </Link>

                  <p
                    className="
                        text-sm
                        text-slate-500
                        mt-2
                      "
                  >
                    Visibility:
                    {form.visibility}
                  </p>

                  <div
                    className="
                        mt-3
                      "
                  >
                    <span
                      className={`

                          px-3
                          py-1
                          rounded-full
                          text-sm

                          ${
                            form.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }

                          `}
                    >
                      {form.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div
                  className="
                      flex
                      gap-2
                      flex-wrap
                    "
                >
                  <Link
                    href={`/form/${form.id}/builder`}
                    className="
                        border
                        px-3
                        py-2
                        rounded
                        text-sm
                      "
                  >
                    Edit
                  </Link>

                  {form.isPublished && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/f/${form.id}`);
                      }}
                      className="
                          border
                          px-3
                          py-2
                          rounded
                          text-sm
                        "
                    >
                      Copy Link
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (form.isPublished) {
                        unpublish.mutate({
                          formId: form.id,
                        });
                      } else {
                        publish.mutate({
                          formId: form.id,
                        });
                      }
                    }}
                    className="
                        bg-black
                        text-white
                        px-3
                        py-2
                        rounded
                        text-sm
                      "
                  >
                    {form.isPublished ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT RESPONSES */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-8
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          Recent Responses
        </h2>

        <div
          className="
          space-y-4
        "
        >
          {analytics.data?.recentResponses?.map((response: any) => (
            <div
              key={response.responseId}
              className="
                    flex
                    justify-between
                    border-b
                    pb-4
                  "
            >
              <div>
                <p
                  className="
                        font-medium
                      "
                >
                  {response.formTitle}
                </p>

                <p
                  className="
                        text-sm
                        text-slate-500
                      "
                >
                  New response submitted
                </p>
              </div>

              <span
                className="
                      text-sm
                      text-slate-400
                    "
              >
                {new Date(response.submittedAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
