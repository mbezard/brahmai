import { useState } from "react";
import { Card } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { defaultPrompt, defaultQuestion } from "./defaultPrompt";
import { useLlm } from "./useLlm";
import { Button } from "./components/ui/button";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as style } from "react-syntax-highlighter/dist/cjs/styles/prism";

function App() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [question, setQuestion] = useState(defaultQuestion);
  const { onSubmit, results, isLoading } = useLlm();
  const onClick = () => {
    onSubmit(prompt, question);
  };
  return (
    <div className="p-5">
      <h1 className="text-center">LLM testing</h1>
      <div className="flex flex-col items-center">
        <div className="w-full">LLM's prompt</div>
        <Textarea
          defaultValue={defaultPrompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="h-2" />

        <div className="w-full">User's question</div>
        <Textarea
          defaultValue={defaultQuestion}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="h-2" />
        <Button variant={"outline"} onClick={onClick} disabled={isLoading}>
          Submit
        </Button>
      </div>

      <div className="h-4" />

      <div className="flex flex-row w-full">
        {results.map((result, i) => (
          <Card key={i} className="flex-1 p-2 m-2">
            <Result result={result} />
          </Card>
        ))}
      </div>
    </div>
  );
}

type ResultProps = {
  result: string;
};

const Result = ({ result }: ResultProps) => {
  return (
    <div>
      <Markdown
        components={{
          code: (props) => {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // @ts-expect-error - I don't know how to fix this
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={style}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {result}
      </Markdown>
    </div>
  );
};

export default App;
