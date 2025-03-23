"use client";

import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

interface Props {
  onRichTextEditorChange?: (html: string) => void;
  placeholder?: string;
  generateAI?: (type: string) => void;
  loading?: boolean;
  type?: string;
  value?: string;
  onChange?: (html: string) => void; // Add onChange prop
}

function RichTextEditor({
  onRichTextEditorChange,
  placeholder = "Start typing here...",
  generateAI,
  loading,
  type,
  value = "",
  onChange, // Add onChange to props
}: Props) {
  const [internalValue, setInternalValue] = useState<string>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: ContentEditableEvent) => {
    const html = e.target.value;
    setInternalValue(html);
    if (onChange) {
      // Call onChange prop
      onChange(html);
    }
    if (onRichTextEditorChange) {
      onRichTextEditorChange(html);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-end mb-5">
        <Button
          variant="outline"
          type="button"
          size="sm"
          disabled={loading}
          onClick={() => generateAI?.(type || "")}
          className="border-primary text-primary flex gap-2">
          {loading ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {loading ? "Generating..." : "Generate from AI"}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="min-h-[120px] p-2 text-sm leading-relaxed rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
