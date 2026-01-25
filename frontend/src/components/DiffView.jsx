import DiffViewer from "react-diff-viewer-continued";

export default function DiffView({ oldCode, newCode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">
        Code Diff (Before vs After)
      </h3>

      <div className="border rounded-lg overflow-hidden">
        <DiffViewer
          oldValue={oldCode}
          newValue={newCode}
          splitView={true}
          showDiffOnly={false}
          leftTitle="Original Code"
          rightTitle="Improved Code"
        />
      </div>
    </div>
  );
}
