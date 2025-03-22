"use client";

import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
  type ContentEditableEvent, // ✅ Import this type
} from "react-simple-wysiwyg";

interface Props {
  onRichTextEditorChange?: (html: string) => void;
}

function RichTextEditor({ onRichTextEditorChange }: Props) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ContentEditableEvent) => {
    const html = e.target.value;
    setValue(html);
    if (onRichTextEditorChange) {
      onRichTextEditorChange(html);
    }
  };

  return (
    <EditorProvider>
      <Editor value={value} onChange={handleChange}>
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
  );
}

export default RichTextEditor;
