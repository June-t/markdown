"use client";
import React, { useState, useEffect, useRef } from "react";
import ToolsComponent from "@/components/tools.components";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const md: MarkdownIt = new MarkdownIt({
      html: true,
      xhtmlOut: true,
      breaks: true,
      langPrefix: "language-",
      linkify: true,
      typographer: false,
      quotes: "“”‘’",
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre><code class="hljs">' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true })
                .value +
              "</code></pre>"
            );
          } catch (__) {}
        }

        return (
          '<pre><code class="hljs">' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    });

    const processedMarkdown = markdown;
    const result = md.render(processedMarkdown);
    setHtml(result);
  }, [markdown]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className='wrapper'>
      <div className='wrapper__header'>
        <div className='header__name'>
          <h1>Markdown</h1>
          <span>It&#39;s a simple markdown editor</span>
        </div>
        <ToolsComponent
          container={textareaRef}
          markdown={markdown}
          html={html}
          setMarkdown={setMarkdown}
        />
      </div>
      <div className='wrapper__body'>
        <div className='body__editor'>
          <div className='editor'>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='body__preview'>
          <div className='preview'>
            <div
              className='preview__markdown'
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
