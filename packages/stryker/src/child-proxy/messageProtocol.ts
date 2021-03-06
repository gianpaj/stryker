import LoggingClientContext from '../logging/LoggingClientContext';

export enum WorkerMessageKind {
  'Init',
  'Work',
  'Dispose'
}

export enum ParentMessageKind {
  'Initialized',
  'Result',
  'Rejection',
  'DisposeCompleted'
}

export type WorkerMessage = InitMessage | WorkMessage | { kind: WorkerMessageKind.Dispose };
export type ParentMessage = WorkResult | { kind: ParentMessageKind.Initialized | ParentMessageKind.DisposeCompleted } | RejectionResult;

// Make this an unlikely command line argument 
// (prevents incidental start of child process)
export const autoStart = 'childProcessAutoStart12937129s7d';

export interface InitMessage {
  kind: WorkerMessageKind.Init;
  loggingContext: LoggingClientContext;
  plugins: string[];
  requirePath: string;
  constructorArgs: any[];
}

export interface WorkResult {
  kind: ParentMessageKind.Result;
  correlationId: number;
  result: any;
}

export interface RejectionResult {
  kind: ParentMessageKind.Rejection;
  correlationId: number;
  error: string;
}

export interface WorkMessage {
  correlationId: number;
  kind: WorkerMessageKind.Work;
  args: any[];
  methodName: string;
}
