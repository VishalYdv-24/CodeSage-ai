import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Toast from "./Toast";
import { detectLanguage } from "../utils/detectLanguage";

const PLACEHOLDERS = {
  python: "# Paste your code here...",
  javascript: "// Paste your code here...",
  java: "// Paste your code here...",
  c: "// Paste your code here...",
  cpp: "// Paste your code here...",
  go: "// Paste your code here...",
};

export default function CodeEditor({ onSubmit, loading }) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(PLACEHOLDERS.python);
  const [toast, setToast] = useState(null);

  const editorRef = useRef(null);
  const languageRef = useRef(language);


  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;


    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 1,
      endColumn: PLACEHOLDERS[languageRef.current].length + 1,
    });


    const disposable = editor.onDidPaste(() => {
      const pastedCode = editor.getValue();
      const detected = detectLanguage(pastedCode);

      if (detected && detected !== languageRef.current) {
        setLanguage(detected);
        setToast(`Detected language: ${detected.toUpperCase()}`);

        setTimeout(() => setToast(null), 2000);
      }
    });


    editor.onDidDispose(() => disposable.dispose());
  };


  useEffect(() => {
    if (!editorRef.current) return;

    const model = editorRef.current.getModel();
    const currentValue = model.getValue().trim();

    if (
      currentValue === "" ||
      Object.values(PLACEHOLDERS).includes(currentValue)
    ) {
      model.setValue(PLACEHOLDERS[language]);

      editorRef.current.setSelection({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: PLACEHOLDERS[language].length + 1,
      });
    }
  }, [language]);

  const handleSubmit = () => {
    const cleanCode = code.trim();

    if (
      !cleanCode ||
      Object.values(PLACEHOLDERS).includes(cleanCode)
    ) {
      return;
    }

    onSubmit({ language, code: cleanCode });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow relative">
      <h2 className="text-xl font-semibold mb-4">Paste Your Code</h2>

      <select
        className="border rounded px-3 py-2 mb-4 w-full"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="go">Go</option>
      </select>

      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="300px"
          language={language}
          theme="vs-dark"
          value={code}
          onMount={handleEditorDidMount}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-black text-white py-2 rounded
                   hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      <Toast message={toast} />
    </div>
  );
}
