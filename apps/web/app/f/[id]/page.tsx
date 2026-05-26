"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { trpc } from "~/trpc/client";

import { FormPreview } from "~/components/FormPreview";

export default function PublicFormPage() {
  const { id } = useParams<{ id: string }>();

  const { data } = trpc.form.getForm.useQuery({
    formId: id,
  });

  const submit = trpc.form.submitForm.useMutation({
    onSuccess() {
      window.location.href = "/thanks";
    },
  });

  const [values, setValues] = useState<Record<string, string>>({});

  if (!data || !data.form) {
    return (
      <div className="p-8">
        <h1>Form not found</h1>
        <p>This form may be deleted or unavailable.</p>
      </div>
    );
  }

  function handleSubmit() {
    submit.mutate({
      formId: id,
      answers: Object.entries(values).map(([fieldId, value]) => ({
        fieldId,
        value,
      })),
    });
  }
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1>{data.form.title}</h1>
      <p>{data.form.description}</p>
      <FormPreview fields={data.fields} values={values} setValues={setValues} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
