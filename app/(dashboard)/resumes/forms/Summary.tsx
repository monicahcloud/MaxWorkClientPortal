import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

interface SummaryProps {
  enableNext: (value: boolean) => void;
}

const Summary: React.FC<SummaryProps> = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    enableNext(true);
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-red-700 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary </h2>
      <p>Add Summary</p>
      <div className="flex justify-between items-end">
        <Button
          variant="outline"
          type="button"
          size="sm"
          className="border-primary text-primary flex gap-2">
          <Brain className="h-4 w-4" /> Generate from AI
        </Button>
      </div>
      <Textarea
        className="mt-5"
        required
        value={summary}
        defaultValue={summary ? summary : resumeInfo?.summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <div className="mt-2 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};
export default Summary;
