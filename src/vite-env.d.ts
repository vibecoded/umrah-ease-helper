
/// <reference types="vite/client" />

// Firefox browser API declaration
interface Browser {
  storage: {
    local: {
      get: (keys: string | string[] | null | undefined) => Promise<Record<string, any>>;
      set: (items: Record<string, any>) => Promise<void>;
      remove: (keys: string | string[]) => Promise<void>;
      clear: () => Promise<void>;
    };
    sync: {
      get: (keys: string | string[] | null | undefined) => Promise<Record<string, any>>;
      set: (items: Record<string, any>) => Promise<void>;
      remove: (keys: string | string[]) => Promise<void>;
      clear: () => Promise<void>;
    };
  };
  runtime: {
    onMessage: {
      addListener: (callback: (message: any, sender: any, sendResponse: Function) => boolean | void) => void;
    };
  };
  alarms: {
    create: (name: string, alarmInfo: { when?: number; delayInMinutes?: number; periodInMinutes?: number }) => void;
    onAlarm: {
      addListener: (callback: (alarm: { name: string }) => void) => void;
    };
  };
  notifications: {
    create: (id: string | undefined, options: any) => Promise<string>;
    create: (options: any) => Promise<string>;
  };
}

// Chrome browser API declaration
interface Chrome {
  storage: {
    local: {
      get: (keys: string | string[] | null | undefined, callback: (items: Record<string, any>) => void) => void;
      set: (items: Record<string, any>, callback?: () => void) => void;
      remove: (keys: string | string[], callback?: () => void) => void;
      clear: (callback?: () => void) => void;
    };
    sync: {
      get: (keys: string | string[] | null | undefined, callback: (items: Record<string, any>) => void) => void;
      set: (items: Record<string, any>, callback?: () => void) => void;
      remove: (keys: string | string[], callback?: () => void) => void;
      clear: (callback?: () => void) => void;
    };
  };
  alarms: {
    create: (name: string, alarmInfo: { when?: number; delayInMinutes?: number; periodInMinutes?: number }) => void;
    onAlarm: {
      addListener: (callback: (alarm: { name: string }) => void) => void;
    };
  };
  notifications: {
    create: (id: string | undefined, options: any, callback?: (notificationId: string) => void) => void;
    create: (options: any, callback?: (notificationId: string) => void) => void;
  };
  runtime: {
    onMessage: {
      addListener: (callback: (message: any, sender: any, sendResponse: Function) => boolean | void) => void;
    };
  };
}

declare global {
  const browser: Browser;
  const chrome: Chrome;
}

export {}; // Make this a module
