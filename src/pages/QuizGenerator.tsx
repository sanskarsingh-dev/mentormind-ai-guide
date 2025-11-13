import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface QuizQuestion {
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
}

const QuizGenerator = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    chapter: "",
    difficulty: "moderate",
    timeLimit: "10"
  });

  const generateQuiz = async () => {
    if (!formData.class || !formData.subject || !formData.chapter) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz', {
        body: formData
      });

      if (error) throw error;

      setQuestions(data.questions);
      setUserAnswers(new Array(data.questions.length).fill(""));
      setQuizStarted(true);
      setTimeLeft(parseInt(formData.timeLimit) * 60);
      startTimer(parseInt(formData.timeLimit) * 60);
    } catch (error: any) {
      console.error('Quiz generation error:', error);
      toast.error(error.message || "Failed to generate quiz");
    } finally {
      setIsGenerating(false);
    }
  };

  const startTimer = (seconds: number) => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx].toLowerCase() === q.correct_answer.toLowerCase()) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: (correct / questions.length) * 100 };
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => {
              setShowResults(false);
              setQuizStarted(false);
              setQuestions([]);
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Generate New Quiz
          </Button>

          <Card className="glass-card rounded-3xl p-12 text-center space-y-6">
            <h1 className="text-4xl font-bold gradient-text">Quiz Results</h1>
            <div className="text-6xl font-bold gradient-text">
              {score.percentage.toFixed(0)}%
            </div>
            <p className="text-xl text-muted-foreground">
              You got {score.correct} out of {score.total} correct!
            </p>
          </Card>

          {questions.map((q, idx) => {
            const isCorrect = userAnswers[idx].toLowerCase() === q.correct_answer.toLowerCase();
            return (
              <Card key={idx} className="glass-card rounded-3xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold">{q.question}</p>
                    <p className="text-sm text-muted-foreground">
                      Your answer: <span className={isCorrect ? "text-green-500" : "text-red-500"}>{userAnswers[idx] || "Not answered"}</span>
                    </p>
                    <p className="text-sm text-green-500">
                      Correct answer: {q.correct_answer}
                    </p>
                    <p className="text-sm text-muted-foreground italic">{q.explanation}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (quizStarted && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <Card className="glass-card rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold gradient-text">{currentQuestion.question}</h2>

            {currentQuestion.options ? (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant={userAnswers[currentQuestionIndex] === option ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => {
                      const newAnswers = [...userAnswers];
                      newAnswers[currentQuestionIndex] = option;
                      setUserAnswers(newAnswers);
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <Input
                placeholder="Type your answer..."
                value={userAnswers[currentQuestionIndex]}
                onChange={(e) => {
                  const newAnswers = [...userAnswers];
                  newAnswers[currentQuestionIndex] = e.target.value;
                  setUserAnswers(newAnswers);
                }}
                className="text-lg py-6"
              />
            )}

            <div className="flex gap-3 pt-4">
              {currentQuestionIndex > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="flex-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={submitQuiz}
                  className="flex-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-4xl font-bold gradient-text">Create a Quiz</h1>

        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Input
                placeholder="e.g., 10th Grade"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="e.g., Mathematics"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Chapter</Label>
              <Input
                placeholder="e.g., Quadratic Equations"
                value={formData.chapter}
                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Limit</Label>
                <Select value={formData.timeLimit} onValueChange={(value) => setFormData({ ...formData, timeLimit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            onClick={generateQuiz}
            disabled={isGenerating}
            className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:opacity-90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuizGenerator;
