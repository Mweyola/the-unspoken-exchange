import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowUp, Clock, Eye, MessageCircle } from "lucide-react";
import { mockAnswers, mockQuestions, Answer } from "@/data/mockData";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const question = useMemo(
    () => mockQuestions.find((q) => q.id === id),
    [id]
  );

  const [answers, setAnswers] = useState<Answer[]>(
    () => (id && mockAnswers[id]) || []
  );
  const [displayName, setDisplayName] = useState("");
  const [answerText, setAnswerText] = useState("");

  if (!question) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="glass-effect rounded-xl p-8 text-center space-y-4">
            <h1 className="font-display text-2xl font-semibold">Question not found</h1>
            <p className="text-muted-foreground">
              The question you are looking for may have been removed or the link is incorrect.
            </p>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!answerText.trim()) return;

    const newAnswer: Answer = {
      id: `local-${Date.now()}`,
      author: displayName.trim() || "Anonymous",
      timeAgo: "Just now",
      upvotes: 0,
      content: answerText.trim(),
    };

    setAnswers((prev) => [newAnswer, ...prev]);
    setAnswerText("");
    setDisplayName("");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <section className="glass-effect rounded-xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{question.category}</Badge>
            {question.isHot && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                Hot
              </Badge>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            {question.title}
          </h1>

          <p className="text-muted-foreground text-lg">
            {question.preview}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {answers.length || question.answers} answers
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {question.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {question.timeAgo}
            </span>
          </div>
        </section>

        <section className="glass-effect rounded-xl p-6 md:p-8 space-y-4">
          <h2 className="font-display text-2xl font-semibold">Add your answer</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-sm text-muted-foreground">Display name (optional)</label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Anonymous"
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground">Your answer</label>
                <Textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Share your perspective..."
                  className="mt-2 min-h-[140px]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="gradient">
                Post Answer
              </Button>
            </div>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">
              Answers ({answers.length || question.answers})
            </h2>
          </div>

          {answers.length === 0 ? (
            <div className="glass-effect rounded-xl p-6 text-muted-foreground">
              No answers yet. Be the first to share your experience.
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <article key={answer.id} className="glass-effect rounded-xl p-5 flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <ArrowUp className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <span className="text-sm font-medium text-foreground">{answer.upvotes}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{answer.author}</span>
                      <span>•</span>
                      <span>{answer.timeAgo}</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{answer.content}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
