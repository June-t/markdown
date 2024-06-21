interface ToolsComponentProps {
  container: any; // change before sending
  html: string;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}

export default function ToolsComponent({
  container,
  html,
  markdown,
  setMarkdown,
}: ToolsComponentProps) {
  const handleToolClick = (tool: string) => {
    if (!container.current) return;

    const { selectionStart, selectionEnd } = container.current;
    const selectedText = markdown.substring(selectionStart, selectionEnd);
    let updatedText = "";

    switch (tool) {
      case "Heading 1":
        updatedText = `# ${selectedText}`;
        break;
      case "Heading 2":
        updatedText = `## ${selectedText}`;
        break;
      case "Heading 3":
        updatedText = `### ${selectedText}`;
        break;
      case "Bold":
        updatedText = `**${selectedText}**`;
        break;
      case "Italic":
        updatedText = `*${selectedText}*`;
        break;
      case "Underline":
        updatedText = `<ins>${selectedText}</ins>`;
        break;
      case "Left":
        updatedText = `<div style="text-align:left;">${selectedText}</div>`;
        break;
      case "Center":
        updatedText = `<div style="text-align:center;">${selectedText}</div>`;
        break;
      case "Right":
        updatedText = `<div style="text-align:right;">${selectedText}</div>`;
        break;
      case "List":
        updatedText = selectedText
          .split("\n")
          .map((line: string) => `- ${line}`)
          .join("\n");
        break;
      case "List Number":
        updatedText = selectedText
          .split("\n")
          .map((line: string, index: number) => `${index + 1}. ${line}`)
          .join("\n");
        break;
      case "Link":
        updatedText = `[${selectedText}](url)`;
        break;
      case "Image":
        updatedText = `![${selectedText}](url)`;
        break;
      case "Code":
        updatedText = `\`\`\`[language]\n${selectedText}\n\`\`\``;
        break;
      case "Quote":
        updatedText = selectedText
          .split("\n")
          .map((line: string) => `> ${line}`)
          .join("\n");
        break;
      case "Table":
        const rows = selectedText.split("\n");
        if (rows.length > 1) {
          const tableHeader = rows[0].split(" ").join(" | ");
          const tableSeparator = rows[0]
            .split(" ")
            .map(() => "---")
            .join(" | ");
          const tableRows = rows
            .slice(1)
            .map((row: string) => row.split(" ").join(" | "))
            .join("\n");
          updatedText = `| ${tableHeader} |\n| ${tableSeparator} |\n| ${tableRows} |`;
        } else {
          updatedText =
            "| Header 1 | Header 2 |\n| --- | --- |\n| Data 1 | Data 2 |";
        }
        break;
      default:
        updatedText = selectedText;
    }

    const newText =
      markdown.substring(0, selectionStart) +
      updatedText +
      markdown.substring(selectionEnd);
    setMarkdown(newText);

    // Establecer la posición del cursor
    setTimeout(() => {
      container.current!.selectionStart = selectionStart + updatedText.length;
      container.current!.selectionEnd = selectionStart + updatedText.length;
      container.current!.focus();
    }, 0);
  };

  const handleExportToHTML = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(html).then(() => {
      let clipboard: HTMLDivElement | null = document.querySelector(".copy");

      if (clipboard) {
        clipboard.classList.add("copy__active");
        clipboard.innerHTML = "Copied!";

        setTimeout(() => {
          clipboard.classList.remove("copy__active");
          clipboard.innerHTML = "Copy to clipboard";
        }, 1000);
      }
    });
  };

  return (
    <div className='header__options'>
      <div className='tools'>
        <div className='tool'>
          <div
            data-tool='Heading 1'
            className='tools__button'
            onClick={() => handleToolClick("Heading 1")}
          >
            H1
          </div>
          <div
            data-tool='Heading 2'
            className='tools__button'
            onClick={() => handleToolClick("Heading 2")}
          >
            H2
          </div>
          <div
            data-tool='Heading 3'
            className='tools__button'
            onClick={() => handleToolClick("Heading 3")}
          >
            H3
          </div>
        </div>
        <div className='tool'>
          <button
            data-tool='Bold'
            className='tools__button'
            onClick={() => handleToolClick("Bold")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.5 3.16667H8.33333C9.71404 3.16667 10.8333 4.28596 10.8333 5.66667C10.8333 7.04738 9.71404 8.16667 8.33333 8.16667H4.5V3.16667Z'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M4.5 8.16667H9.16667C10.4553 8.16667 11.5 9.21134 11.5 10.5C11.5 11.7887 10.4553 12.8333 9.16667 12.8333H4.5V8.16667Z'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Italic'
            className='tools__button'
            onClick={() => handleToolClick("Italic")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.33329 3.16667H7.83329M9.33329 3.16667H10.8333M9.33329 3.16667L6.66663 12.8333M6.66663 12.8333H5.16663M6.66663 12.8333H8.16663'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Underline'
            className='tools__button'
            onClick={() => handleToolClick("Underline")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.16663 12.8333H12.8333'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10.8333 3.16667V7.33334C10.8333 8.89815 9.56477 10.1667 7.99996 10.1667C6.43515 10.1667 5.16663 8.89815 5.16663 7.33334V3.16667'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className='tool'>
          <button
            data-tool='Left'
            className='tools__button'
            onClick={() => handleToolClick("Left")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.16663 3.83333H9.49996M3.16663 12.1667H9.49996M3.16663 8H12.8333'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Center'
            className='tools__button'
            onClick={() => handleToolClick("Center")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.16663 3.83333H10.8333M5.16663 12.1667H10.8333M3.16663 8H12.8333'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Right'
            className='tools__button'
            onClick={() => handleToolClick("Right")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.49996 3.83333H12.8333M6.49996 12.1667H12.8333M3.16663 8H12.8333'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className='tool'>
          <button
            data-tool='List'
            className='tools__button'
            onClick={() => handleToolClick("List")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.49996 4.00001H12.1666M6.49996 8H12.1666M6.49996 12H12.1666M4.33329 4.00001C4.33329 4.1841 4.18405 4.33334 3.99996 4.33334C3.81586 4.33334 3.66663 4.1841 3.66663 4.00001C3.66663 3.81591 3.81586 3.66667 3.99996 3.66667C4.18405 3.66667 4.33329 3.81591 4.33329 4.00001ZM4.33329 8C4.33329 8.1841 4.18405 8.33334 3.99996 8.33334C3.81586 8.33334 3.66663 8.1841 3.66663 8C3.66663 7.81591 3.81586 7.66667 3.99996 7.66667C4.18405 7.66667 4.33329 7.81591 4.33329 8ZM4.33329 12C4.33329 12.1841 4.18405 12.3333 3.99996 12.3333C3.81586 12.3333 3.66663 12.1841 3.66663 12C3.66663 11.8159 3.81586 11.6667 3.99996 11.6667C4.18405 11.6667 4.33329 11.8159 4.33329 12Z'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='List Number'
            className='tools__button'
            onClick={() => handleToolClick("List Number")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.16663 4.16667L4.16663 3.16667V6.83334M4.16663 6.83334H3.16663M4.16663 6.83334H4.83329M8.83328 9.5H7.77078C7.28362 9.5 7.0121 8.95726 7.27048 8.57158C7.30231 8.52407 7.34737 8.48742 7.39499 8.45573L8.59489 7.65731C8.64251 7.62562 8.68742 7.58882 8.71993 7.54176C9.01685 7.11189 8.71415 6.5 8.16834 6.5H7.16663M11.1666 9.83334H12.1309C12.9539 9.83334 13.0999 11.0917 12.34 11.3038C12.3032 11.314 12.2647 11.3181 12.2265 11.3195L11.8333 11.3333L12.2265 11.3472C12.2647 11.3485 12.3032 11.3526 12.34 11.3629C13.0999 11.575 12.9539 12.8333 12.1309 12.8333H11.1666'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className='tool'>
          <button
            data-tool='Link'
            className='tools__button'
            onClick={() => handleToolClick("Link")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.1666 8.83333L11.9999 8C13.1045 6.89543 13.1045 5.10457 11.9999 4C10.8954 2.89543 9.1045 2.89543 7.99994 4L7.1666 4.83333M4.83327 7.16666L3.99994 8C2.89537 9.10457 2.89537 10.8954 3.99994 12C5.1045 13.1046 6.89537 13.1046 7.99994 12L8.83327 11.1667M9.49994 6.5L6.49994 9.5'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Image'
            className='tools__button'
            onClick={() => handleToolClick("Image")}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.16663 10.6667L4.99742 8.3378C5.51656 7.67742 6.50964 7.65581 7.05702 8.29299L8.66663 10.1667M7.27666 8.54866C7.96809 7.66911 8.93152 6.42304 8.9942 6.34196L9.00085 6.33345C9.52093 5.67732 10.5108 5.65721 11.057 6.29299L12.6666 8.16667M4.49996 3.16667H11.5C12.2363 3.16667 12.8333 3.76363 12.8333 4.50001V11.5C12.8333 12.2364 12.2363 12.8333 11.5 12.8333H4.49996C3.76358 12.8333 3.16663 12.2364 3.16663 11.5V4.50001C3.16663 3.76363 3.76358 3.16667 4.49996 3.16667Z'
                stroke='#667085'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button
            data-tool='Quote'
            className='tools__button'
            onClick={() => handleToolClick("Quote")}
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
            >
              <path
                d='M14 15V14C14 13.0681 14 12.6022 14.1522 12.2346C14.3552 11.7446 14.7446 11.3552 15.2346 11.1522C15.6022 11 16.0681 11 17 11H17.5C18.9045 11 19.6067 11 20.1111 11.3371C20.3295 11.483 20.517 11.6705 20.6629 11.8889C21 12.3933 21 13.0955 21 14.5V15.3431C21 16.1606 21 16.5694 20.8478 16.9369C20.6955 17.3045 20.4065 17.5935 19.8284 18.1716L19.2396 18.7604C18.7822 19.2178 18 18.8938 18 18.2469V17.8787C18 17.3934 17.6066 17 17.1213 17H16C14.8954 17 14 16.1046 14 15Z'
                stroke='#323232'
                strokeWidth='2'
                strokeLinejoin='round'
              ></path>
              <path
                d='M3 9V8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H6.5C7.90446 5 8.60669 5 9.11114 5.33706C9.32952 5.48298 9.51702 5.67048 9.66294 5.88886C10 6.39331 10 7.09554 10 8.5V9.34315C10 10.1606 10 10.5694 9.84776 10.9369C9.69552 11.3045 9.40649 11.5935 8.82843 12.1716L8.23965 12.7604C7.78219 13.2178 7 12.8938 7 12.2469V11.8787C7 11.3934 6.6066 11 6.12132 11H5C3.89543 11 3 10.1046 3 9Z'
                stroke='#323232'
                strokeWidth='2'
                strokeLinejoin='round'
              ></path>
            </svg>
          </button>
          <button
            data-tool='Table'
            className='tools__button'
            onClick={() => handleToolClick("Table")}
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
            >
              <path
                d='M20 9.33333V6C20 4.89543 19.1046 4 18 4H14.6667M20 9.33333H14.6667M20 9.33333V14.6667M4 9.33333V6C4 4.89543 4.89543 4 6 4H9.33333M4 9.33333H9.33333M4 9.33333V14.6667M14.6667 9.33333H9.33333M14.6667 9.33333V4M14.6667 9.33333V14.6667M9.33333 9.33333V4M9.33333 9.33333V14.6667M20 14.6667V18C20 19.1046 19.1046 20 18 20H14.6667M20 14.6667H14.6667M4 14.6667V18C4 19.1046 4.89543 20 6 20H9.33333M4 14.6667H9.33333M14.6667 14.6667H9.33333M14.6667 14.6667V20M9.33333 14.6667V20M9.33333 4H14.6667M9.33333 20H14.6667'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </button>
          <button
            data-tool='Code'
            className='tools__button'
            onClick={() => handleToolClick("Code")}
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
            >
              <path
                d='M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='export'>
        <button onClick={() => handleExportToHTML()}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 3C5.89543 3 5 3.89543 5 5V17.2C5 18.0566 5.00078 18.6389 5.03755 19.089C5.07337 19.5274 5.1383 19.7516 5.21799 19.908C5.40973 20.2843 5.7157 20.5903 6.09202 20.782C6.24842 20.8617 6.47262 20.9266 6.91104 20.9624C7.36113 20.9992 7.94342 21 8.8 21H15.2C16.0566 21 16.6389 20.9992 17.089 20.9624C17.5274 20.9266 17.7516 20.8617 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C18.8617 19.7516 18.9266 19.5274 18.9624 19.089C18.9992 18.6389 19 18.0566 19 17.2V13C19 10.7909 17.2091 9 15 9H14.25C12.4551 9 11 7.54493 11 5.75C11 4.23122 9.76878 3 8.25 3H7ZM10 1C16.0751 1 21 5.92487 21 12V17.2413C21 18.0463 21 18.7106 20.9558 19.2518C20.9099 19.8139 20.8113 20.3306 20.564 20.816C20.1805 21.5686 19.5686 22.1805 18.816 22.564C18.3306 22.8113 17.8139 22.9099 17.2518 22.9558C16.7106 23 16.0463 23 15.2413 23H8.75868C7.95372 23 7.28936 23 6.74817 22.9558C6.18608 22.9099 5.66937 22.8113 5.18404 22.564C4.43139 22.1805 3.81947 21.5686 3.43597 20.816C3.18868 20.3306 3.09012 19.8139 3.04419 19.2518C2.99998 18.7106 2.99999 18.0463 3 17.2413L3 5C3 2.79086 4.79086 1 7 1H10ZM17.9474 7.77263C16.7867 5.59506 14.7572 3.95074 12.3216 3.30229C12.7523 4.01713 13 4.85463 13 5.75C13 6.44036 13.5596 7 14.25 7H15C16.0712 7 17.0769 7.28073 17.9474 7.77263Z'
              fill='#0F1729'
            ></path>
          </svg>
          Export as HTML
        </button>
        <button className='copy' onClick={() => handleCopyToClipboard()}>
          Copy to clipboard
        </button>
      </div>
    </div>
  );
}
