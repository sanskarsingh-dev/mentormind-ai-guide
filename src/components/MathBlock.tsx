import { BlockMath, InlineMath } from "https://esm.sh/react-katex@0.6.0";

export const MathBlock = ({ children }: { children: string }) => {
  const text = children.trim();

  // \[ ... \] → display math
  if (text.startsWith("\[ ") && text.endsWith(" \]")) {
    return <BlockMath math={text.slice(2, -2)} />;
  }

  // \( ... \) or \( ... \) → inline math
  if (
    (text.startsWith("\\(") && text.endsWith("\\)")) ||
    (text.startsWith("\( ") && text.endsWith(" \)") && !text.startsWith("\[ "))
  ) {
    const math = text.replace(/^[\$\\(]+|[\\( \\)]+ \)/g, "");
    return <InlineMath math={math} />;
  }

  return <>{children}</>;
};
