import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/tools";
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-red-50/30">
          <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-red-100 text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Something went wrong
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                An unexpected error occurred while processing this tool. No files or private data were compromised.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-lg text-left text-xs font-mono text-slate-700 max-h-32 overflow-y-auto border border-slate-200">
                {this.state.error.message || "Unknown error"}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 border-slate-200 hover:bg-slate-100"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </Button>
              <Button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tools
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
