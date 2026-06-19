import React from "react";

/**
 * A lightweight, safe Markdown renderer for React 19
 * Translates standard Markdown characters into styled Tailwind JSX elements
 */
export function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const lines = text.split("\n");
  let inList = false;
  let listItems: React.ReactNode[] = [];
  const renderedElements: React.ReactNode[] = [];

  const parseInlineStyles = (segment: string): React.ReactNode[] => {
    // Basic bold **text** and italic *text* parsing
    const parts: React.ReactNode[] = [];
    let currentText = segment;
    let key = 0;

    while (currentText.length > 0) {
      const boldMatch = currentText.match(/\*\*([^*]+)\*\*/);
      const italicMatch = currentText.match(/\*([^*]+)\*/);

      if (boldMatch && (!italicMatch || boldMatch.index! < italicMatch.index!)) {
        const index = boldMatch.index!;
        if (index > 0) {
          parts.push(<span key={`text-${key++}`}>{currentText.substring(0, index)}</span>);
        }
        parts.push(
          <strong key={`bold-${key++}`} className="font-extrabold text-[#006233] underline decoration-[#006233]/30">
            {boldMatch[1]}
          </strong>
        );
        currentText = currentText.substring(index + boldMatch[0].length);
      } else if (italicMatch) {
        const index = italicMatch.index!;
        if (index > 0) {
          parts.push(<span key={`text-${key++}`}>{currentText.substring(0, index)}</span>);
        }
        parts.push(
          <em key={`italic-${key++}`} className="italic text-[#C18F5A] bg-[#F2EDE4]/65 px-1 rounded">
            {italicMatch[1]}
          </em>
        );
        currentText = currentText.substring(index + italicMatch[0].length);
      } else {
        parts.push(<span key={`text-${key++}`}>{currentText}</span>);
        break;
      }
    }
    return parts;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // End unordered list if we encounter non-list items
    if (!trimmed.startsWith("- ") && !trimmed.startsWith("* ") && inList) {
      renderedElements.push(
        <ul key={`ul-${index}`} className="list-disc pl-6 my-3 space-y-2 text-[#4A453C]">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }

    if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h4 key={`h3-${index}`} className="text-base font-bold text-[#1A1A1A] mt-4 mb-2 tracking-tight font-serif decoration-[#C18F5A] decoration-wavy decoration-1">
          {parseInlineStyles(trimmed.substring(4))}
        </h4>
      );
    } else if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h3 key={`h2-${index}`} className="text-lg font-serif font-black text-[#006233] mt-5 mb-3 tracking-tight border-b border-[#E5E1D8] pb-1">
          {parseInlineStyles(trimmed.substring(3))}
        </h3>
      );
    } else if (trimmed.startsWith("# ")) {
      renderedElements.push(
        <h2 key={`h1-${index}`} className="text-xl font-serif font-black text-[#006233] mt-6 mb-4 tracking-tight">
          {parseInlineStyles(trimmed.substring(2))}
        </h2>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInlineStyles(trimmed.substring(2))}
        </li>
      );
    } else if (trimmed.startsWith("> ")) {
      renderedElements.push(
        <blockquote key={`quote-${index}`} className="border-l-4 border-[#C18F5A] bg-[#F2EDE4]/40 p-3 italic text-[#4A453C] rounded-r my-4 font-serif">
          {parseInlineStyles(trimmed.substring(2))}
        </blockquote>
      );
    } else if (trimmed === "") {
      renderedElements.push(<div key={`space-${index}`} className="h-2" />);
    } else {
      renderedElements.push(
        <p key={`p-${index}`} className="text-sm leading-relaxed text-[#2D2D2D] my-2">
          {parseInlineStyles(line)}
        </p>
      );
    }
  });

  // Safe release if list was active at EOF
  if (inList) {
    renderedElements.push(
      <ul key={`ul-eof`} className="list-disc pl-6 my-3 space-y-2 text-[#4A453C]">
        {listItems}
      </ul>
    );
  }

  return <div className="space-y-1">{renderedElements}</div>;
}
