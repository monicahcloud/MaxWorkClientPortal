import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useResumeBuilder, Skill } from "@/app/context/ResumeBuilderContext";

interface Props {
  index: number;
  onRemove: (indexToRemove: number) => void;
  onComplete: () => void;
  updateSkill: (index: number, updatedSkill: Skill) => void;
  skill: Skill;
}

function SkillsForm({
  index,
  onRemove,
  onComplete,
  updateSkill,
  skill,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(parseInt(skill.level, 10) || 0);

  const handleSave = () => {
    onComplete();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const updatedSkill = { ...skill, name: newName, level: rating.toString() };
    updateSkill(index, updatedSkill);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    const updatedSkill = {
      ...skill,
      name: skill.name,
      level: value.toString(), // Corrected line: update level with rating value
    };
    updateSkill(index, updatedSkill);
  };

  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold mb-2 uppercase">Skill #{index + 1}</h2>
        <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>
      <div className="justify-between flex">
        <Input
          type="text"
          placeholder="Skill Name"
          value={skill.name}
          onChange={handleNameChange}
          className="mt-2 "
        />
        <Rating
          style={{ maxWidth: 120 }}
          value={rating}
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
}

export default SkillsForm;
