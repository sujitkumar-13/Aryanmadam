"use client";

import { useParams } from "next/navigation";
import RemedyForm from "@/components/admin/RemedyForm";

export default function EditRemedyPage() {
  const params = useParams();
  const id = params?.id as string;

  return <RemedyForm id={id} mode="update" />;
}